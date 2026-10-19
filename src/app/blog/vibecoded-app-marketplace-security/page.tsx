import { Metadata } from 'next';

export const metadata = {
  title: 'VibeStall Marketplace Security | VibeStall',
  description: 'Security layers protecting buyers and sellers.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      <nav className="border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="VibeStall" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-[#2563eb]">VibeStall</span>
          </a>
          <a href="/marketplace" className="text-sm font-medium hover:text-[#2563eb] transition-colors">Marketplace</a>
        </div>
      </nav>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <article>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Marketplace Security</h1>
          <p className="text-lg text-[#94a3b8] mb-8">
            How VibeStall protects buyers and sellers through automated verification,
            secure payments, and proactive moderation.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Security Layers</h2>
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">App Verification</h3>
                <p className="text-sm text-[#94a3b8]">
                  Every app is scanned for keystore validity, signature integrity, source code
                  vulnerabilities, and viruses before publication.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Secure Payments</h3>
                <p className="text-sm text-[#94a3b8]">
                  Platform-fee split payments with status tracking. Sellers earn only when
                  purchases are completed and downloads are confirmed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.618 3.048A6.006 6.006 0 0020 9c0 3.313-2.673 6-6 6s-6-2.687-6-6a6.006 6.006 0 00-4.552-1.092A11.955 11.955 0 0112 2.944z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">User Moderation</h3>
                <p className="text-sm text-[#94a3b8]">
                  Admins can ban users for policy violations, fraud, or spam. Banned users
                  cannot access the platform or list new apps.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Admin Oversight</h3>
                <p className="text-sm text-[#94a3b8]">
                  Full admin dashboard for approving/rejecting apps, reviewing payments, and
                  managing bans across the platform.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl border border-[#334155] bg-[#111827]">
            <h3 className="text-lg font-bold mb-2">Join a Secure Marketplace</h3>
            <p className="text-[#94a3b8] mb-4">Buy and sell vibecoded apps with verified security.</p>
            <a href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] text-white font-semibold hover:bg-[#3b82f6] transition-colors">
              Browse Marketplace
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
