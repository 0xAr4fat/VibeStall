'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, Clock, Download } from 'lucide-react';

export default function BuyerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [purchasesRes, appsRes] = await Promise.all([
        supabase.from('payments').select('*').eq('buyer_id', user.id),
        supabase.from('apps').select('*').eq('status', 'published').limit(6),
      ]);
      setStats({
        totalPurchases: purchasesRes.data?.length || 0,
        totalSpent: purchasesRes.data?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0,
        featuredApps: appsRes.data || [],
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole="buyer" />
      <div className="flex-1 overflow-y-auto bg-[#0f172a]">
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
              <p className="text-[#94a3b8]">Manage your purchases and browse apps.</p>
            </div>
            <Button asChild><a href="/marketplace" className="text-[#2563eb] hover:underline">Browse Marketplace</a></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Purchases" value={stats?.totalPurchases} icon={Package} />
            <StatCard title="Total Spent" value={`$${stats?.totalSpent?.toFixed(2) || '0.00'}`} icon={DollarSign} />
            <StatCard title="Available Apps" value={stats?.featuredApps?.length} icon={Download} />
            <StatCard title="Downloads" value={0} icon={Clock} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Featured Apps</h3>
                <div className="space-y-4">
                  {stats?.featuredApps?.map((app: any) => (
                    <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1e293b] cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-[#1e293b] flex items-center justify-center">
                        <Package className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{app.name}</p>
                        <p className="text-xs text-[#94a3b8]">${app.price}</p>
                      </div>
                      <Badge variant="success">Published</Badge>
                    </div>
                  ))}
                  {!stats?.featuredApps?.length && (
                    <p className="text-sm text-[#94a3b8]">No featured apps available.</p>
                  )}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#1e293b]">
                    <div className="w-8 h-8 rounded-full bg-[#dc2626]/20 flex items-center justify-center text-[#dc2626]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security scan completed</p>
                      <p className="text-xs text-[#94a3b8]">Your purchased apps are verified safe.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#1e293b]">
                    <div className="w-8 h-8 rounded-full bg-[#94a3b8]/20 flex items-center justify-center text-[#94a3b8]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New apps available</p>
                      <p className="text-xs text-[#94a3b8]">Check the marketplace for updates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
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
