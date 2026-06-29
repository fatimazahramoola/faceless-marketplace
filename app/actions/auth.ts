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
  const name = String(formData.get("name") || "").trim();

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
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

  redirect("/dashboard");
}

export async function signInWithGoogle() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${await getOrigin()}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/login?error=google");
  }

  redirect(data.url);
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
