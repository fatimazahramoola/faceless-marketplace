"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/Button";
import { FormLabel } from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/Input";
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ResetPasswordPage() {
  const [accessToken, setAccessToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqLower = /[a-z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const requirementsMet = reqLength && reqUpper && reqLower && reqNumber;
  const passwordMatch = confirm.length === 0 || password === confirm;

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
    if (!requirementsMet || !passwordMatch) {
      setMessage("Please meet the password requirements and make sure both fields match.");
      return;
    }

    const supabase = createBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setSuccess(false);
    } else {
      setMessage("Password updated. You can now log in.");
      setSuccess(true);
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reset your password</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Enter a new password and confirm it so you can log in again.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <FormLabel htmlFor="password">New password</FormLabel>
          <div className="mt-2 relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Create a new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              aria-label={showPassword ? "Hide new password" : "Show new password"}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <FormLabel htmlFor="confirm_password">Confirm password</FormLabel>
          <div className="mt-2 relative">
            <Input
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
          <p className="font-semibold text-neutral-900">Password requirements</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              {reqLength ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XMarkIcon className="h-4 w-4 text-red-500" />}
              <span>At least 8 characters</span>
            </li>
            <li className="flex items-center gap-2">
              {reqUpper ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XMarkIcon className="h-4 w-4 text-red-500" />}
              <span>One uppercase letter</span>
            </li>
            <li className="flex items-center gap-2">
              {reqLower ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XMarkIcon className="h-4 w-4 text-red-500" />}
              <span>One lowercase letter</span>
            </li>
            <li className="flex items-center gap-2">
              {reqNumber ? <CheckIcon className="h-4 w-4 text-green-600" /> : <XMarkIcon className="h-4 w-4 text-red-500" />}
              <span>One number</span>
            </li>
          </ul>
          {confirm.length > 0 ? (
            <p className={passwordMatch ? "text-green-700" : "text-red-600"}>
              {passwordMatch ? "Passwords match." : "Passwords do not match."}
            </p>
          ) : null}
        </div>

        {message ? (
          <div className={success ? "rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
            {message}
          </div>
        ) : null}

        {success ? (
          <div className="space-y-3">
            <Link href="/login" className="inline-flex w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/50">
              Continue to Log In
            </Link>
            <Link href="/login" className="block text-center text-sm font-semibold text-[#7B3FE4] hover:text-[#5C33C6] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/40">
              Back to login
            </Link>
          </div>
        ) : (
          <Button type="submit" className="w-full" disabled={!requirementsMet || !passwordMatch}>
            Set new password
          </Button>
        )}
      </form>
    </main>
  );
}
