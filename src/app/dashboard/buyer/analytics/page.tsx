'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, DollarSign, Clock } from 'lucide-react';

export default function BuyerAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [paymentsRes, appsRes] = await Promise.all([
        supabase.from('payments').select('*').eq('buyer_id', user.id),
        supabase.from('apps').select('*').eq('status', 'published'),
      ]);
      const payments = paymentsRes.data || [];
      const completed = payments.filter((p: any) => p.status === 'completed');
      setStats({
        totalSpent: completed.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
        totalPurchases: completed.length,
        availableApps: appsRes.data?.length || 0,
        recentPurchases: completed.slice(0, 5),
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
        <h1 className="text-2xl font-bold tracking-tight mb-8">Buyer Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Spent" value={`$${stats?.totalSpent?.toFixed(2) || '0.00'}`} icon={DollarSign} />
          <StatCard title="Purchases" value={stats?.totalPurchases} icon={Package} />
          <StatCard title="Available Apps" value={stats?.availableApps} icon={Package} />
          <StatCard title="Recent Activity" value={stats?.recentPurchases?.length} icon={Clock} />
        </div>
        <Card>
          <div className="p-6">
            <h3 className="font-bold mb-4">Recent Purchases</h3>
            <div className="space-y-4">
              {stats?.recentPurchases?.map((p: any) => (
                <div key={p.id} className="p-4 rounded-xl border border-[#334155] bg-[#111827] flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.apps?.name}</p>
                    <p className="text-sm text-[#94a3b8]">${p.amount} • {new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="font-medium">{p.status}</span>
                </div>
              ))}
              {!stats?.recentPurchases?.length && <p className="text-sm text-[#94a3b8] text-center py-4">No recent purchases.</p>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) {
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
