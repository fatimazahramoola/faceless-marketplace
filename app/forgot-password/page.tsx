"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendPasswordReset } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { FormLabel } from "@/components/ui/FormLabel";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(sendPasswordReset, {
    success: false,
    message: "",
  });

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reset your password</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Enter the email address associated with your account and we&apos;ll send you a password reset link.
      </p>

      <form action={formAction} className="space-y-5">
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        {state.message ? (
          <p className={state.success ? "rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
            {state.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send reset link"}
        </Button>

        <p className="text-sm text-neutral-600">
          <Link href="/login" className="font-semibold text-[#7B3FE4] hover:text-[#5C33C6] focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]/40">
            Back to login
          </Link>
        </p>
      </form>
    </main>
  );
}
