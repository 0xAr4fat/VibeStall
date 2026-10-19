'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Package, DollarSign } from 'lucide-react';

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [appsRes, profilesRes, paymentsRes] = await Promise.all([
        supabase.from('apps').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('payments').select('*'),
      ]);
      const apps = appsRes.data || [];
      const profiles = profilesRes.data || [];
      const payments = paymentsRes.data || [];
      const completed = payments.filter((p: any) => p.status === 'completed');
      setStats({
        totalApps: apps.length,
        pendingApps: apps.filter((a: any) => a.status === 'pending').length,
        totalRevenue: completed.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
        totalBuyers: profiles.filter((p: any) => p.role === 'buyer').length,
        totalSellers: profiles.filter((p: any) => p.role === 'seller').length,
        totalDownloads: apps.reduce((sum: number, a: any) => sum + (a.download_count || 0), 0),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-8">Platform Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <StatCard title="Total Apps" value={stats?.totalApps} icon={Package} />
          <StatCard title="Pending Apps" value={stats?.pendingApps} icon={Package} />
          <StatCard title="Total Revenue" value={`$${stats?.totalRevenue?.toFixed(0)}`} icon={DollarSign} />
          <StatCard title="Buyers" value={stats?.totalBuyers} icon={Package} />
          <StatCard title="Sellers" value={stats?.totalSellers} icon={Package} />
          <StatCard title="Total Downloads" value={stats?.totalDownloads} icon={Package} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="font-bold mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-center justify-center">
                <p className="text-sm text-[#94a3b8]">Revenue chart coming soon.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="font-bold mb-4">App Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <p className="text-sm text-[#94a3b8]">Category chart coming soon.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string; value: number | string; icon: any }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#94a3b8]">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="h-6 w-6 text-[#94a3b8]" />
      </div>
    </Card>
  );
}
