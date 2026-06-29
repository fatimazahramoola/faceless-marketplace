import { sendPasswordResetForm } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Forgot your password?</h1>
      <p className="mb-4 text-sm text-neutral-600">Enter your email to receive a password reset link.</p>
      <form action={sendPasswordResetForm} className="space-y-4">
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          placeholder="you@example.com"
        />
        <button className="w-full rounded-xl bg-[#7B3FE4] px-4 py-3 text-white" type="submit">Send reset link</button>
      </form>
      <p className="mt-4 text-sm text-neutral-600">If an account exists, you will receive an email with reset instructions.</p>
    </main>
  );
}
