"use client";

import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";
import { logIn, signInWithGoogle, signUp } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/types";

type AuthFormProps = {
  mode: "login" | "signup";
};

const initialState: AuthFormState = {
  success: false,
  message: "",
};

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? logIn : signUp;
  const [state, formAction, pending] = useActionState(action, initialState);
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const redirectTo = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("redirectTo") ?? ""
    : "";

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 p-5 sm:p-8">
      <form action={formAction} className="space-y-5">
        {isSignup && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-neutral-900"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-neutral-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-neutral-900"
          >
            Password
          </label>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={8}
              className="min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {isSignup && (
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-semibold text-neutral-900"
            >
              Confirm password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required={isSignup}
              minLength={8}
              className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
            />
          </div>
        )}

        <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />
        {state.message && (
          <p
            className={`rounded-xl border px-4 py-3 text-sm ${
              state.success
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#7B3FE4] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Please wait..." : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <form action={signInWithGoogle} className="mt-4">
        <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />
        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-800 transition hover:bg-neutral-50"
        >
          Continue with Google
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-neutral-600">
        {isSignup ? "Already have an account?" : "New to Faceless?"}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-semibold text-[#7B3FE4] hover:underline"
        >
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
