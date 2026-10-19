import { Metadata } from 'next';

export const metadata = {
  title: 'How to Sell Your Vibecoded App | VibeStall',
  description: 'Step-by-step guide to selling your vibecoded app on VibeStall.',
};

export default function SellAppGuide() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-6">How to Sell Your Vibecoded App</h1>
          <p className="text-lg text-[#94a3b8] mb-8">
            A step-by-step guide to listing, verifying, and selling your vibecoded app on VibeStall —
            from source code packaging to keystore and signature verification.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Prepare Your App Files</h2>
          <p className="text-[#cbd5e1] mb-4">
            Package your app with everything needed:
          </p>
          <ul className="list-disc list-inside text-[#94a3b8] mb-6 space-y-2">
            <li><strong>Source code:</strong> Full project source in a ZIP archive</li>
            <li><strong>Keystore:</strong> Your signing keystore file (.jks, .keystore, .p12)</li>
            <li><strong>Signature:</strong> App signature file (.sig, .rsa)</li>
            <li><strong>App icon:</strong> PNG or JPG app icon</li>
            <li><strong>Metadata:</strong> Name, description, version, platform, price</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Create Your Seller Account</h2>
          <p className="text-[#cbd5e1] mb-4">
            Sign up as a seller on VibeStall. Your account links to all your listings and earnings.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Upload and Submit for Verification</h2>
          <p className="text-[#cbd5e1] mb-4">
            Use the seller dashboard to upload your files. VibeStall automatically checks:
          </p>
          <ul className="list-disc list-inside text-[#94a3b8] mb-6 space-y-2">
            <li>Keystore validity and certificate expiry</li>
            <li>Signature matches the keystore certificate</li>
            <li>Source code vulnerability scan</li>
            <li>Virus and malware scan</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Get Approved and Start Selling</h2>
          <p className="text-[#cbd5e1] mb-4">
            Once verified, your app is published. Buyers can purchase and download instantly.
            You earn revenue minus a small platform fee.
          </p>

          <div className="mt-12 p-6 rounded-xl border border-[#334155] bg-[#111827]">
            <h3 className="text-lg font-bold mb-2">Ready to sell?</h3>
            <p className="text-[#94a3b8] mb-4">Join other developers monetizing their vibecoded apps.</p>
            <a href="/auth/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] text-white font-semibold hover:bg-[#3b82f6] transition-colors">
              Start Selling
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
