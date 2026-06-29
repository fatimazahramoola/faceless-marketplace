"use server";

import { createServerClient } from "@/lib/supabase/server";
import { isValidEmail, normalizeEmail } from "@/lib/waitlist";
import type { WaitlistResult } from "@/lib/types";

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const rawEmail = formData.get("email");

  if (typeof rawEmail !== "string" || !rawEmail.trim()) {
    return { success: false, error: "Please enter your email address." };
  }

  const email = normalizeEmail(rawEmail);

  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      if (error.code === "23505") {
        return { success: true, alreadyRegistered: true };
      }

      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Waitlist is temporarily unavailable. Please try again later.",
    };
  }
}
