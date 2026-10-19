import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Marketplace - Buy vibecoded apps | VibeStall',
  description: 'Browse verified vibecoded apps with full source code, keystore, and signatures.',
};

const apps = [
  {
    name: 'TaskFlow Pro',
    desc: 'AI-powered task management built with vibe coding.',
    price: '$49',
    cat: 'Productivity',
    downloads: '1,200',
    verified: true,
  },
  {
    name: 'ChatBot AI',
    desc: 'Custom conversational AI for your business.',
    price: '$79',
    cat: 'AI & ML Tools',
    downloads: '850',
    verified: true,
  },
  {
    name: 'Pixel Editor',
    desc: 'Image editing web app with full source code.',
    price: '$29',
    cat: 'Design & Creative',
    downloads: '430',
    verified: false,
  },
  {
    name: 'FitTracker',
    desc: 'Workout and nutrition mobile app.',
    price: '$39',
    cat: 'Mobile Apps',
    downloads: '620',
    verified: false,
  },
  {
    name: 'WebScraper',
    desc: 'Automated web data extraction tool.',
    price: '$69',
    cat: 'Web Apps',
    downloads: '310',
    verified: true,
  },
  {
    name: 'ZenGame',
    desc: 'Minimalist puzzle game for mobile.',
    price: '$19',
    cat: 'Games',
    downloads: '980',
    verified: false,
  },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      <nav className="border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="VibeStall" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-[#2563eb]">VibeStall</span>
          </Link>
          <Link
            href="/marketplace"
            className="px-4 py-2 rounded-xl border border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb] font-medium hover:bg-[#2563eb]/20 transition-colors"
          >
            Marketplace
          </Link>
          <Link href="/auth/login" className="text-sm hover:text-[#2563eb] transition-colors">Sign in</Link>
        </div>
      </nav>

      <div className="px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-[#94a3b8] mt-1">Buy and sell verified vibecoded apps.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search apps..."
              className="flex-1 h-11 px-4 rounded-xl border border-[#334155] bg-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
            <Button variant="outline">Filters</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <article
              key={app.name}
              className="group flex flex-col h-full rounded-xl border border-[#334155] bg-[#111827] hover:border-[#2563eb]/50 transition-colors"
            >
              <div className="h-48 rounded-t-xl bg-[#1e293b] overflow-hidden relative">
                {app.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#16a34a]/10 px-2 py-1 rounded text-xs font-medium text-[#4ade80] border border-[#16a34a]/30">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{app.name}</h3>
                  {app.verified && <span className="text-xs bg-[#16a34a]/20 text-[#4ade80] px-2 py-1 rounded">Verified</span>}
                </div>
                <p className="text-sm text-[#94a3b8] mb-4 line-clamp-2">{app.desc}</p>
                <div className="flex items-center justify-between mb-6 text-xs text-[#94a3b8]">
                  <span>{app.cat}</span>
                  <span>{app.downloads} downloads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">{app.price}</span>
                  <Link href="/auth/login" className="px-4 py-2 rounded-xl border border-[#334155] text-[#cbd5e1] text-sm font-medium hover:bg-[#1e293b] transition-colors">
                    Buy
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
