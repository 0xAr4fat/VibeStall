'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, Clock } from 'lucide-react';

export default function SellerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [appsRes, paymentsRes] = await Promise.all([
        supabase.from('apps').select('*').eq('seller_id', user.id).order('created_at', { ascending: false }),
        supabase.from('payments').select('*').eq('seller_id', user.id),
      ]);
      const appsData = appsRes.data || [];
      const paymentsData = paymentsRes.data || [];
      setStats({
        totalApps: appsData.length,
        pendingApps: appsData.filter((a: any) => a.status === 'pending').length,
        verifiedApps: appsData.filter((a: any) => a.status === 'published').length,
        rejectedApps: appsData.filter((a: any) => a.status === 'rejected').length,
        totalEarnings: paymentsData.filter((p: any) => p.status === 'completed').reduce((sum: number, p: any) => sum + (p.seller_earning || 0), 0),
        totalSales: paymentsData.filter((p: any) => p.status === 'completed').length,
      });
      setApps(appsData);
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
      <Sidebar userRole="seller" />
      <div className="flex-1 overflow-y-auto bg-[#0f172a]">
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-[#94a3b8]">Manage your apps and earnings.</p>
            </div>
            <Button asChild><a href="/dashboard/seller/upload"><span className="mr-2">+</span>Upload New App</a></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Apps" value={stats?.totalApps} icon={Package} />
            <StatCard title="Pending Review" value={stats?.pendingApps} icon={Clock} />
            <StatCard title="Published" value={stats?.verifiedApps} icon={Package} />
            <StatCard title="Rejected" value={stats?.rejectedApps} icon={Package} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#94a3b8]">Total Earnings</p>
                  <p className="text-2xl font-bold">${stats?.totalEarnings?.toFixed(2) || '0.00'}</p>
                </div>
                <DollarSign className="h-6 w-6 text-[#94a3b8]" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#94a3b8]">Total Sales</p>
                  <p className="text-2xl font-bold">{stats?.totalSales}</p>
                </div>
                <Package className="h-6 w-6 text-[#94a3b8]" />
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-6">
              <h3 className="font-bold mb-4">My Apps</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#334155]">
                      <th className="pb-3 font-medium text-[#94a3b8]">App</th>
                      <th className="pb-3 font-medium text-[#94a3b8]">Status</th>
                      <th className="pb-3 font-medium text-[#94a3b8]">Price</th>
                      <th className="pb-3 font-medium text-[#94a3b8]">Downloads</th>
                      <th className="pb-3 font-medium text-[#94a3b8]">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app) => (
                      <tr key={app.id} className="border-b border-[#334155]/50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center">
                              <Package className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{app.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant={app.status === 'published' ? 'success' : app.status === 'rejected' ? 'destructive' : 'pending'}>
                            {app.status}
                          </Badge>
                        </td>
                        <td className="py-4">${app.price}</td>
                        <td className="py-4">{app.download_count}</td>
                        <td className="py-4 text-[#94a3b8]">{new Date(app.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {!apps.length && (
                      <tr><td colSpan={5} className="py-8 text-center text-sm text-[#94a3b8]">No apps uploaded yet.</td></tr>
                    )}
                  </tbody>
                </table>
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
