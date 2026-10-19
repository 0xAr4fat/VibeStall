'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

export default function AdminApps() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    try {
      const { data } = await supabase.from('apps').select('*, profiles(*)').order('created_at', { ascending: false });
      setApps(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(appId: string, status: string) {
    const { error } = await supabase.from('apps').update({
      status,
      verification_status: status === 'published' ? 'passed' : status === 'rejected' ? 'failed' : 'pending',
    }).eq('id', appId);
    if (!error) fetchApps();
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
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-8">App Management</h1>
        <p className="text-[#94a3b8] mb-8">Review and manage all platform apps.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="pb-3 font-medium text-[#94a3b8]">App</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Seller</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Price</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Status</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-b border-[#334155]/50 hover:bg-[#1e293b] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center">
                        <Package className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{app.name}</span>
                    </div>
                  </td>
                  <td className="py-4">{app.profiles?.email || 'Unknown'}</td>
                  <td className="py-4">${app.price}</td>
                  <td className="py-4">
                    <Badge variant={app.status === 'published' ? 'success' : app.status === 'rejected' ? 'destructive' : 'pending'}>{app.status}</Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(app.id, 'published')}>Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(app.id, 'rejected')}>Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
