import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function createServerClient() {
  const { url, anonKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createSupabaseServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components can read but not set cookies. Server Actions and
          // Route Handlers still apply auth cookie updates.
        }
      },
    },
  });
}

export async function getCurrentUser() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
