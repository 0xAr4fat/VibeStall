import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Apps listed', value: '2,400+' },
  { label: 'Buyers', value: '12,000+' },
  { label: 'Sellers', value: '850+' },
  { label: 'Total sales', value: '$4.2M+' },
];

const features = [
  {
    title: 'Source code included',
    desc: 'You get the full source code with every app. No black boxes.',
  },
  {
    title: 'Keystore & signature verified',
    desc: 'Every app is checked for a valid keystore and matching signature before it goes live.',
  },
  {
    title: 'Auto security scan',
    desc: 'Vulnerability and virus scanning runs on every upload.',
  },
  {
    title: 'Secure payments',
    desc: 'Payments are held until the buyer confirms the download.',
  },
];

export const metadata = {
  title: 'VibeStall - Buy and sell vibecoded apps',
  description: 'Marketplace for vibecoded apps with full source code, keystore, and verified signatures.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-[#f8fafc]">
      <nav className="border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="VibeStall" width={40} height={40} />
            <span className="text-xl font-bold tracking-tight text-[#2563eb]">VibeStall</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#cbd5e1]">
            <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign in</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm px-4 py-2 rounded border border-[#334155] hover:bg-[#1e293b] transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="text-sm px-4 py-2 rounded bg-[#2563eb] text-white hover:bg-[#3b82f6] transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#334155] bg-[#1e293b] px-4 py-1 text-xs font-medium text-[#94a3b8] mb-8">
              <span className="h-2 w-2 rounded-full bg-[#16a34a] animate-pulse" />
              Open for listings
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Buy and sell<span className="text-[#2563eb]"> vibecoded apps</span>
            </h1>
            <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto mb-10">
              A marketplace for vibecoded apps. Every listing ships with full source code,
              a keystore, and a verified signature. We scan everything before it goes live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="w-full sm:w-auto">
                <ArrowRight className="h-5 w-5 mr-2" />
                Browse apps
              </Button>
              <Link href="/auth/signup" className="w-full sm:w-auto border border-[#334155] bg-transparent px-6 py-3 rounded-xl text-[#cbd5e1] font-medium hover:bg-[#1e293b] transition-colors">
                List your app
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[#334155] bg-[#111827]/40">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-[#94a3b8]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: '01', t: 'List your app', d: 'Upload your source code, keystore, and signature. Set your price.' },
                { n: '02', t: 'We verify it', d: 'Our system scans the keystore, signature, and source code for security issues.' },
                { n: '03', t: 'Get paid', d: 'Approved apps go live. Buyers purchase and download instantly. You get paid.' },
              ].map((step) => (
                <div key={step.t} className="space-y-4">
                  <div className="h-10 w-10 rounded-full border border-[#334155] bg-[#1e293b] flex items-center justify-center text-[#2563eb] font-bold text-lg">
                    {step.n}
                  </div>
                  <h3 className="text-lg font-bold">{step.t}</h3>
                  <p className="text-[#94a3b8] leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[#2563eb]/30 bg-[#2563eb]/5 p-12 text-center text-[#2563eb]">
              <h2 className="text-3xl font-bold mb-4">Ready to list your app?</h2>
              <p className="text-[#cbd5e1]/80 mb-8">Join other developers selling their vibecoded apps.</p>
              <Link href="/dashboard/seller/upload" className="px-8 py-3 rounded-xl bg-white text-[#0f172a] font-bold hover:bg-[#1e293b] transition-colors">
                Upload your app
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#334155] bg-[#0f172a] py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="VibeStall" width={32} height={32} />
            <span className="text-lg font-bold tracking-tight">VibeStall</span>
          </div>
          <p className="text-sm text-[#94a3b8]">© 2026 VibeStall. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-[#94a3b8]">
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Sign up</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
