'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [pendingApps, setPendingApps] = useState<any[]>([]);
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
      setStats({
        totalApps: apps.length,
        pendingApps: apps.filter((a: any) => a.status === 'pending').length,
        verifiedApps: apps.filter((a: any) => a.status === 'published').length,
        rejectedApps: apps.filter((a: any) => a.status === 'rejected').length,
        totalRevenue: payments.filter((p: any) => p.status === 'completed').reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
        totalBuyers: profiles.filter((p: any) => p.role === 'buyer').length,
        totalSellers: profiles.filter((p: any) => p.role === 'seller').length,
        activeBans: profiles.filter((p: any) => p.is_banned).length,
      });
      setPendingApps(apps.filter((a: any) => a.status === 'pending').sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function approveApp(appId: string) {
    const { error } = await supabase.from('apps').update({ status: 'published', verification_status: 'passed' }).eq('id', appId);
    if (!error) {
      alert('App approved');
      fetchStats();
    }
  }

  async function rejectApp(appId: string) {
    const { error } = await supabase.from('apps').update({ status: 'rejected', verification_status: 'failed' }).eq('id', appId);
    if (!error) {
      alert('App rejected');
      fetchStats();
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
      <Sidebar userRole="admin" />
      <div className="flex-1 overflow-y-auto bg-[#0f172a]">
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-[#94a3b8]">Platform management.</p>
            </div>
            <Button variant="destructive" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <StatCard title="Total Apps" value={stats?.totalApps} icon={Package} />
            <StatCard title="Pending Review" value={stats?.pendingApps} icon={Clock} />
            <StatCard title="Published" value={stats?.verifiedApps} icon={Package} />
            <StatCard title="Rejected" value={stats?.rejectedApps} icon={Package} />
            <StatCard title="Total Revenue" value={`$${stats?.totalRevenue?.toFixed(0)}`} icon={DollarSign} />
            <StatCard title="Active Bans" value={stats?.activeBans} icon={Package} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Pending Apps</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {pendingApps.length > 0 ? (
                    pendingApps.map((app) => (
                      <div key={app.id} className="p-4 rounded-xl border border-[#334155] bg-[#111827]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{app.name}</h4>
                          <Badge variant="pending">Pending</Badge>
                        </div>
                        <p className="text-sm text-[#94a3b8] truncate max-w-[200px]">{app.description}</p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="secondary" onClick={() => approveApp(app.id)}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectApp(app.id)}>Reject</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#94a3b8] text-center py-4">No pending apps.</p>
                  )}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild><a href="/dashboard/admin/apps">Manage All Apps</a></Button>
                  <Button variant="outline" className="w-full" asChild><a href="/dashboard/admin/users">Manage Users</a></Button>
                  <Button variant="outline" className="w-full" asChild><a href="/dashboard/admin/payments">Review Payments</a></Button>
                  <Button variant="outline" className="w-full" asChild><a href="/dashboard/admin/bans">Manage Bans</a></Button>
                  <Button variant="outline" className="w-full" asChild><a href="/dashboard/admin/analytics">View Analytics</a></Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Platform Security</h3>
                <div className="space-y-4">
                  <SecurityRow label="Verified Apps" value={stats?.verifiedApps} />
                  <SecurityRow label="Rejected Apps" value={stats?.rejectedApps} />
                  <SecurityRow label="Banned Users" value={stats?.activeBans} />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <div className="p-6">
                <h3 className="font-bold mb-4">Recent Payments</h3>
                <p className="text-sm text-[#94a3b8]">Payment management coming soon.</p>
              </div>
            </Card>
          </div>
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

function SecurityRow({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}
