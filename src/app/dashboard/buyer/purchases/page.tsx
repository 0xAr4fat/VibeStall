'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Download } from 'lucide-react';

export default function BuyerPurchases() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  async function fetchPurchases() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('payments').select('*, apps(*)').eq('buyer_id', user.id).order('created_at', { ascending: false });
      setPurchases(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function downloadApp(payment: any) {
    if (payment.status !== 'completed') return;
    window.open(payment.download_url, '_blank');
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
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-8">My Purchases</h1>
        <p className="text-[#94a3b8] mb-8">Access your purchased apps.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {purchases.map((p) => (
            <Card key={p.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center">
                  <Package className="h-6 w-6" />
                </div>
                <Badge variant={p.status === 'completed' ? 'success' : 'pending'}>{p.status}</Badge>
              </div>
              <h3 className="font-bold text-lg mb-1">{p.apps?.name}</h3>
              <p className="text-sm text-[#94a3b8] mb-4">{p.apps?.description?.slice(0, 100)}...</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Amount</span>
                  <span className="font-medium">${p.amount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Purchased</span>
                  <span className="font-medium">{new Date(p.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <Button onClick={() => downloadApp(p)} disabled={p.status !== 'completed'} className="w-full">
                {p.status === 'completed' ? <Download className="h-4 w-4 mr-2" /> : ''} {p.status === 'completed' ? 'Download' : 'Processing...'}
              </Button>
            </Card>
          ))}
          {!purchases.length && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-[#94a3b8]" />
              </div>
              <h3 className="font-bold">No purchases yet</h3>
              <p className="text-sm text-[#94a3b8]">Start browsing the marketplace to find apps.</p>
              <Button asChild><a href="/marketplace">Browse Marketplace</a></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
