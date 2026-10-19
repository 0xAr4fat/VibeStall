import { Metadata } from 'next';

export const metadata = {
  title: 'Keystore & Signature Verification | VibeStall',
  description: 'How VibeStall verifies keystore integrity and app signatures.',
};

export default function VerificationGuide() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-6">Keystore & Signature Verification</h1>
          <p className="text-lg text-[#94a3b8] mb-8">
            How VibeStall's automated verification ensures every vibecoded app is secure,
            signed, and safe before it reaches the marketplace.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What We Verify</h2>
          <ul className="list-disc list-inside text-[#94a3b8] mb-6 space-y-3">
            <li><strong>Keystore integrity:</strong> Valid signing certificate, not expired, correct algorithm and key size</li>
            <li><strong>Signature matching:</strong> App signature matches the keystore certificate</li>
            <li><strong>Source code scan:</strong> Automated vulnerability detection</li>
            <li><strong>Virus scan:</strong> Malware and binary analysis on all uploaded files</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">Verification Outcomes</h2>
          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-xl border border-[#16a34a]/30 bg-[#16a34a]/10">
              <p className="font-medium text-[#4ade80]">✓ Approved</p>
              <p className="text-sm text-[#4ade80]/80 mt-1">App passes all checks and is published to the marketplace.</p>
            </div>
            <div className="p-4 rounded-xl border border-[#dc2626]/30 bg-[#dc2626]/10">
              <p className="font-medium text-[#fca5a5]">✗ Rejected</p>
              <p className="text-sm text-[#dc2626]/80 mt-1">App fails verification. Seller receives feedback and can resubmit.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Why It Matters</h2>
          <p className="text-[#cbd5e1] mb-6">
            Buyers know they're purchasing authentic, secure apps. Sellers build trust with
            verified listings that stand out.
          </p>

          <div className="mt-12 p-6 rounded-xl border border-[#334155] bg-[#111827]">
            <h3 className="text-lg font-bold mb-2">Sell Securely</h3>
            <p className="text-[#94a3b8] mb-4">List your verified app and start earning.</p>
            <a href="/dashboard/seller/upload" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] text-white font-semibold hover:bg-[#3b82f6] transition-colors">
              Upload Your App
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
