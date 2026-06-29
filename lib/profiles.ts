import type { Profile } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}
