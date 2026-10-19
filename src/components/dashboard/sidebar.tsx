'use client';

import Link from 'next/link';
import { ChevronRight, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  userRole: string | null;
}

const buyerItems = [
  { name: 'Dashboard', href: '/dashboard/buyer' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'My Purchases', href: '/dashboard/buyer/purchases' },
  { name: 'Analytics', href: '/dashboard/buyer/analytics' },
];

const sellerItems = [
  { name: 'Dashboard', href: '/dashboard/seller' },
  { name: 'My Apps', href: '/dashboard/seller/apps' },
  { name: 'Upload App', href: '/dashboard/seller/upload' },
  { name: 'Sales', href: '/dashboard/seller/sales' },
];

const adminItems = [
  { name: 'Dashboard', href: '/dashboard/admin' },
  { name: 'Pending Apps', href: '/dashboard/admin/apps' },
  { name: 'Users', href: '/dashboard/admin/users' },
  { name: 'Payments', href: '/dashboard/admin/payments' },
  { name: 'Bans', href: '/dashboard/admin/bans' },
  { name: 'Analytics', href: '/dashboard/admin/analytics' },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const items =
    userRole === 'admin' ? adminItems : userRole === 'seller' ? sellerItems : buyerItems;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 border-r border-[#334155] bg-[#111827]/90 backdrop-blur-lg -translate-x-full transition-transform duration-300 md:translate-x-0">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="VibeStall" className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight text-[#2563eb]">VibeStall</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/80 hover:text-white"
            >
              {item.name}
              <ChevronRight className="ml-auto h-3 w-3 text-[#64748b]" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#334155]">
          <Button variant="outline" className="w-full" onClick={() => supabase.auth.signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
