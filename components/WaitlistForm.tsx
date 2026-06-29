"use client";

import { useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData();
    formData.set("email", email);

    const result = await joinWaitlist(formData);

    if (!result.success) {
      setState("error");
      setErrorMessage(result.error);
      return;
    }

    if (result.alreadyRegistered) {
      setState("duplicate");
      return;
    }

    setState("success");
    setEmail("");
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="text-lg font-semibold text-green-800">
          You&apos;re on the list!
        </p>
        <p className="mt-2 text-sm text-green-700">
          We&apos;ll email you when Faceless Marketplace launches in South
          Africa.
        </p>
      </div>
    );
  }

  if (state === "duplicate") {
    return (
      <div className="rounded-2xl border border-[#D9D1FF] bg-white px-6 py-8 text-center">
        <p className="text-lg font-semibold text-[#7B3FE4]">
          You&apos;re already on the waitlist.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          We&apos;ll be in touch when we launch in South Africa.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <Input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={state === "loading"}
        />
        <Button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Joining…" : "Join Waitlist"}
        </Button>
      </div>

      {state === "error" && errorMessage && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
