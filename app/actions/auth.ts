"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import type { AuthFormState } from "@/lib/types";

async function getOrigin() {
  const headerStore = await headers();
  return headerStore.get("origin") ?? "https://facelessmarketplace.co.za";
}

type CredentialResult =
  | { email: string; password: string; name: string }
  | { error: string };

function readCredentials(formData: FormData): CredentialResult {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm_password") || "");
  const name = String(formData.get("name") || "").trim();

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (confirm && password !== confirm) {
    return { error: "Passwords do not match." };
  }

  // Basic password strength: must include a letter and a number
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { error: "Password must include letters and numbers." };
  }

  return { email, password, name };
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const credentials = readCredentials(formData);

  if ("error" in credentials) {
    return { success: false, message: credentials.error };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        name: credentials.name || credentials.email.split("@")[0],
      },
      emailRedirectTo: `${await getOrigin()}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Account created. Check your email if confirmation is enabled.",
  };
}

export async function logIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const credentials = readCredentials(formData);
  const redirectTo = String(formData.get("redirectTo") || "");

  if ("error" in credentials) {
    return { success: false, message: credentials.error };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  // Safe redirect: allow absolute origin match or root-relative paths.
  if (redirectTo) {
    try {
      const url = new URL(redirectTo, await getOrigin());
      const origin = await getOrigin();
      if (url.origin === origin) {
        redirect(url.pathname + url.search + url.hash);
      }
    } catch {
      // fall through to default
    }
  }

  redirect("/dashboard");
}

export async function signInWithGoogle(formData?: FormData) {
  const redirectTo = formData ? String(formData.get("redirectTo") || "") : "";
  const supabase = await createServerClient();
  const redirectBase = `${await getOrigin()}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectBase,
    },
  });

  if (error || !data.url) {
    redirect("/login?error=google");
  }

  // Attach the original redirectTo as a query param so callback can continue
  if (data.url) {
    const url = new URL(data.url);
    if (redirectTo) url.searchParams.set("redirectTo", redirectTo);
    redirect(url.toString());
  }
}

export async function logOut() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const avatarUrl = String(formData.get("avatar_url") || "").trim();

  if (name.length < 2) {
    redirect("/profile?error=name");
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase
    .from("profiles")
    .update({
      name,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  redirect("/profile?updated=1");
}
