'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard/buyer' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'My Apps', href: '/dashboard/seller/apps' },
  { name: 'Sales', href: '/dashboard/seller/sales' },
  { name: 'Analytics', href: '/dashboard/buyer/analytics' },
  { name: 'Admin', href: '/dashboard/admin' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="VibeStall" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-[#2563eb]">VibeStall</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#cbd5e1]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-xl transition-colors ${
                pathname === item.href
                  ? 'bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20'
                  : 'hover:bg-[#1e293b] hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden md:block text-sm px-4 py-2 rounded-xl border border-[#334155] hover:bg-[#1e293b] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="hidden md:block text-sm px-4 py-2 rounded-xl bg-[#2563eb] text-white hover:bg-[#3b82f6] transition-colors"
          >
            Get started
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[#cbd5e1]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0f172a]">
          <div className="absolute top-0 right-0 w-full max-w-xs p-6 shadow-2xl border-l border-[#334155]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setOpen(false)} className="text-[#94a3b8]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-3 text-left rounded-xl transition-colors ${
                    pathname === item.href
                      ? 'bg-[#2563eb]/10 text-[#2563eb]'
                      : 'text-[#94a3b8] hover:bg-[#1e293b] hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#334155]">
              <Link
                href="/auth/login"
                className="w-full py-2.5 rounded-xl border border-[#334155] text-center text-sm hover:bg-[#1e293b] block transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="w-full py-2.5 rounded-xl bg-[#2563eb] text-white text-sm font-medium text-center block hover:bg-[#3b82f6] transition-colors mt-3"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
