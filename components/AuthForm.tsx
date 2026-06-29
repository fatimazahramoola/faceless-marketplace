"use client";

import Link from "next/link";
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
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={8}
            className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
          />
        </div>

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
