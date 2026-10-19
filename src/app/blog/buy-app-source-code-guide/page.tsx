import { Metadata } from 'next';

export const metadata = {
  title: 'Buy App Source Code Guide | VibeStall',
  description: 'Complete guide to buying verified app source code on VibeStall.',
};

export default function BuySourceCodeGuide() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-6">Buy App Source Code Guide</h1>
          <p className="text-lg text-[#94a3b8] mb-8">
            Everything you need to know about purchasing verified app source code on VibeStall —
            from browsing to checkout and download.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Browse Verified Apps</h2>
          <p className="text-[#cbd5e1] mb-4">
            Every app on VibeStall includes full source code, keystore, and verified signatures.
            Look for the "Verified" badge to ensure it passed our security scan.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Secure Checkout</h2>
          <p className="text-[#cbd5e1] mb-4">
            Payments are processed securely. Funds are held until the download is confirmed,
            protecting both buyers and sellers.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Instant Download</h2>
          <p className="text-[#cbd5e1] mb-4">
            Once payment is complete, download the app package including source code, keystore,
            and signature files immediately.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. What You Receive</h2>
          <ul className="list-disc list-inside text-[#94a3b8] mb-6 space-y-2">
            <li><strong>Source code:</strong> Complete project source in ZIP format</li>
            <li><strong>Keystore:</strong> Signing keystore for app updates and publishing</li>
            <li><strong>Signature:</strong> App signature file for verification</li>
            <li><strong>App icon:</strong> App branding assets</li>
            <li><strong>Metadata:</strong> Version, platform, and app details</li>
          </ul>

          <div className="mt-12 p-6 rounded-xl border border-[#334155] bg-[#111827]">
            <h3 className="text-lg font-bold mb-2">Start Browsing</h3>
            <p className="text-[#94a3b8] mb-4">Find your next app project on VibeStall.</p>
            <a href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] text-white font-semibold hover:bg-[#3b82f6] transition-colors">
              Browse Marketplace
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
