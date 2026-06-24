const steps = [
  { label: "Buyer Pays", style: "neutral" as const },
  { label: "Faceless Holds Funds", style: "brand" as const },
  { label: "Seller Paid", style: "success" as const },
];

const styleClasses = {
  neutral: "border border-neutral-200 bg-white text-neutral-900",
  brand: "border border-[#D9D1FF] bg-[#F4F1FF] text-[#3F2B96] font-bold",
  success: "border border-green-200 bg-green-50 text-green-700 font-bold",
};

export function HowItWorksCard() {
  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-5 shadow-xl sm:p-8">
      <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
        How FACELESS Works
      </h2>

      <p className="mt-2 text-center text-sm text-neutral-600 sm:text-base">
        We sit between the buyer and seller.
      </p>

      {/* Mobile: vertical flow */}
      <div className="mt-8 flex flex-col items-center gap-2 md:hidden">
        {steps.map((step, index) => (
          <div key={step.label} className="flex w-full flex-col items-center">
            <div
              className={`w-full rounded-xl p-4 text-center text-sm font-semibold ${styleClasses[step.style]}`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <span className="py-1 text-xl text-[#3F2B96]" aria-hidden>
                ↓
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Tablet+: horizontal flow */}
      <div className="mt-10 hidden items-center gap-2 md:grid md:grid-cols-5 md:gap-3">
        {steps.map((step, index) => (
          <div key={step.label} className="contents">
            <div
              className={`rounded-xl p-3 text-center text-xs font-semibold lg:p-4 lg:text-sm ${styleClasses[step.style]}`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div className="text-center text-xl text-[#3F2B96] lg:text-2xl">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-neutral-600 sm:mt-8 sm:text-base">
        Payment is only released once the buyer receives the item.
      </p>
    </div>
  );
}
