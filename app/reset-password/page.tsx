"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [accessToken, setAccessToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token") || "";
      setTimeout(() => setAccessToken(token), 0);
    }
  }, []);
  useEffect(() => {
    if (!accessToken) {
      setTimeout(() => setMessage("Open the link from your email to reset your password."), 0);
    }
  }, [accessToken]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createBrowserClient();
    // If the reset link has authenticated the user, update the password
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated. You can now log in.");
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>
      <p className="mb-4 text-sm text-neutral-600">{message || "Choose a new password."}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          placeholder="New password"
        />
        <button className="w-full rounded-xl bg-[#7B3FE4] px-4 py-3 text-white" type="submit">Set new password</button>
      </form>
    </main>
  );
}
