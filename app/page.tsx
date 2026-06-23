export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Faceless Marketplace"
              className="h-14 w-auto"
            />

            <div>
              <div className="text-xl font-bold tracking-wide text-neutral-900">
                FACELESS
              </div>

              <div className="text-xs tracking-[0.2em] text-neutral-500">
                MARKETPLACE
              </div>
            </div>
          </div>

          <a
            href="mailto:fatimazahramoola@gmail.com?subject=Faceless Marketplace Waitlist"
            className="inline-flex items-center justify-center rounded-xl bg-[#3F2B96] px-8 py-4 text-white font-semibold hover:opacity-90 transition"
          >
            Join Waitlist
          </a>

        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <div className="mb-6 inline-flex rounded-full bg-[#F4F1FF] px-4 py-2 text-sm font-medium text-[#3F2B96]">
              Safe buying. Safer selling.
            </div>

            <h1 className="text-5xl font-bold leading-tight text-neutral-900 md:text-7xl">
              Buy and sell
              <br />
              safely.
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-relaxed text-neutral-600">
              Stop sending money directly to strangers.
              Faceless Marketplace acts as a trusted middleman,
              holding payment securely until both buyer and seller
              have peace of mind.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="mailto:fatimazahramoola@gmail.com?subject=Faceless Marketplace Waitlist"
                className="rounded-2xl bg-[#3F2B96] px-8 py-4 font-semibold text-white inline-flex items-center justify-center"
              >
                Join Waitlist
              </a>
              <a
                href="#learn-more"
                className="rounded-2xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-700 inline-flex items-center justify-center"
              >
                Learn More
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-neutral-700">
              <span>✓ Buyer Protection</span>
              <span>✓ Seller Protection</span>
              <span>✓ Secure Payments</span>
              <span>✓ Dispute Resolution</span>
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-xl">

              <h2 className="text-center text-3xl font-bold text-neutral-900">
                How FACELESS Works
              </h2>

              <p className="mt-2 text-center text-neutral-600">
                We sit between the buyer and seller.
              </p>

              <div className="mt-10 grid grid-cols-5 items-center gap-3">

                <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center text-sm font-semibold text-neutral-900">
                  Buyer Pays
                </div>

                <div className="text-center text-2xl text-[#3F2B96]">
                  →
                </div>

                <div className="rounded-xl border border-[#D9D1FF] bg-[#F4F1FF] p-4 text-center text-sm font-bold text-[#3F2B96]">
                  Faceless Holds Funds
                </div>

                <div className="text-center text-2xl text-[#3F2B96]">
                  →
                </div>

                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-bold text-green-700">
                  Seller Paid
                </div>

              </div>

              <p className="mt-8 text-center text-neutral-600">
                Payment is only released once the buyer receives the item.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* WHY FACELESS */}
      <section
        id="learn-more"
        className="bg-white py-12">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="text-center text-4xl font-bold text-neutral-900">
            Why Faceless?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-neutral-600">
            Traditional marketplaces connect buyers and sellers.
            Faceless protects both sides of the transaction.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="text-xl font-bold text-neutral-900">
                Traditional Marketplace
              </h3>

              <ul className="mt-6 space-y-4 text-neutral-600">
                <li>Buyer sends money directly</li>
                <li>Seller hopes payment is real</li>
                <li>Trust is required upfront</li>
                <li>Disputes are difficult</li>
              </ul>
            </div>

            <div className="rounded-3xl border-2 border-[#3F2B96] p-8">
              <h3 className="text-xl font-bold text-[#3F2B96]">
                Faceless Marketplace
              </h3>

              <ul className="mt-6 space-y-4 text-neutral-700">
                <li>✓ Payment held securely</li>
                <li>✓ Seller verifies payment first</li>
                <li>✓ Buyer receives protection</li>
                <li>✓ Built-in dispute resolution</li>
              </ul>
            </div>

          </div>

        </div>

      </section>
      <footer className="border-t border-neutral-200 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex items-center gap-4">

              <img
                src="/logo.png"
                alt="Faceless Marketplace"
                className="h-12 w-auto"
              />

              <div>
                <div className="text-xl font-bold tracking-wide text-neutral-900">
                  FACELESS
                </div>

                <div className="text-xs tracking-[0.2em] text-neutral-500">
                  MARKETPLACE
                </div>
              </div>

            </div>

            <p className="mt-4 max-w-sm text-neutral-600">
              Your trusted middleman for safer transactions.
            </p>

            <div>
              <h4 className="font-semibold text-neutral-900">
                Contact
              </h4>

              <a
                href="mailto:fatimazahramoola@gmail.com"
                className="text-[#3F2B96] hover:underline"
              >
                fatimazahramoola@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-sm text-neutral-500">
            © {new Date().getFullYear()} Faceless Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}