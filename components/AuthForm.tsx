"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { logIn, signInWithGoogle, signUp } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/types";
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { FormLabel } from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/Input";

type AuthFormProps = { mode: "login" | "signup" };

const initialState: AuthFormState = { success: false, message: "" };

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const search = useSearchParams();
  const redirectTo = (search && search.get && search.get("redirectTo")) ?? "";

  const action = isSignup ? signUp : logIn;
  const [state, formAction, pending] = useActionState(action, initialState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordMatch = confirm.length === 0 || password === confirm;
  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqLower = /[a-z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const requirementsMet = reqLength && reqUpper && reqLower && reqNumber;

  const strength = Math.min(100, Math.max(0, password.length * 6 + (reqUpper ? 5 : 0) + (reqLower ? 5 : 0) + (reqNumber ? 5 : 0)));



  // Server actions are wired via `formAction` from `useActionState`.

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 p-5 sm:p-8">
      <form action={formAction} className="space-y-5">
        {isSignup && (
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-neutral-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="mt-2 min-h-11 w-full rounded-xl border border-neutral-300 px-4 text-base focus:border-[#7B3FE4] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/20"
            />
          </div>
        )}

        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <FormLabel htmlFor="password">Password</FormLabel>
            {!isSignup ? (
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#7B3FE4] hover:text-[#5C33C6] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/40"
              >
                Forgot password?
              </Link>
            ) : null}
          </div>
          <div className="mt-2 relative">
            <Input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isSignup && (
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-semibold text-neutral-900 flex items-center justify-between">
              <span>Confirm password</span>
              {confirm.length > 0 && <span className={"text-sm " + (passwordMatch ? "text-green-600" : "text-red-600")}>{passwordMatch ? "Matched" : "Not matching"}</span>}
            </label>

            <div className="mt-2 relative">
              <Input
                id="confirm_password"
                name="confirm_password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required={isSignup}
                minLength={8}
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

            <div className="mt-2">
              <ul className="space-y-1">
                <li className="flex items-center text-sm">{reqLength ? <CheckIcon className="h-4 w-4 text-green-600 mr-2" /> : <XMarkIcon className="h-4 w-4 text-red-500 mr-2" />}<span className={reqLength ? "text-green-700" : "text-neutral-600"}>At least 8 characters</span></li>
                <li className="flex items-center text-sm">{reqUpper ? <CheckIcon className="h-4 w-4 text-green-600 mr-2" /> : <XMarkIcon className="h-4 w-4 text-red-500 mr-2" />}<span className={reqUpper ? "text-green-700" : "text-neutral-600"}>One uppercase letter</span></li>
                <li className="flex items-center text-sm">{reqLower ? <CheckIcon className="h-4 w-4 text-green-600 mr-2" /> : <XMarkIcon className="h-4 w-4 text-red-500 mr-2" />}<span className={reqLower ? "text-green-700" : "text-neutral-600"}>One lowercase letter</span></li>
                <li className="flex items-center text-sm">{reqNumber ? <CheckIcon className="h-4 w-4 text-green-600 mr-2" /> : <XMarkIcon className="h-4 w-4 text-red-500 mr-2" />}<span className={reqNumber ? "text-green-700" : "text-neutral-600"}>One number</span></li>
              </ul>

              <div className="mt-2 h-2 w-full rounded-full bg-neutral-100">
                <div className={"h-2 rounded-full transition-width duration-200 " + (strength < 33 ? 'bg-red-400' : strength < 66 ? 'bg-yellow-400' : 'bg-green-500')} style={{ width: Math.min(100, strength) + '%' }} />
              </div>
              <p className="mt-2 text-sm text-neutral-600">Password strength: {strength < 33 ? 'Weak' : strength < 66 ? 'Good' : 'Strong'}</p>
            </div>
          </div>
        )}

        <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />

        {state.message && (
          <>
            <p className={"rounded-xl border px-4 py-3 text-sm " + (state.success ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700")}>
              {state.message}
            </p>
          </>
        )}

        <Button
          type="submit"
          disabled={pending || (isSignup && (!passwordMatch || !requirementsMet || !name.trim() || !email.trim()))}
          className="w-full"
        >
          {pending ? "Please wait..." : isSignup ? "Create account" : "Log in"}
        </Button>
      </form>

      <form action={signInWithGoogle} className="mt-4">
        <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />
        <Button type="submit" variant="secondary" className="w-full">
          Continue with Google
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-neutral-600">
        {isSignup ? "Already have an account?" : "New to Faceless?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-[#7B3FE4] hover:underline">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
