'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const { data } = await supabase.from('payments').select('*, apps(*)').order('created_at', { ascending: false });
      setPayments(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function updatePaymentStatus(paymentId: string, status: string) {
    const { error } = await supabase.from('payments').update({ status }).eq('id', paymentId);
    if (!error) fetchPayments();
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
        <h1 className="text-2xl font-bold tracking-tight mb-8">Payment Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="pb-3 font-medium text-[#94a3b8]">Transaction</th>
                <th className="pb-3 font-medium text-[#94a3b8]">App</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Buyer</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Amount</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Status</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-[#334155]/50 hover:bg-[#1e293b] transition-colors">
                  <td className="py-4 font-mono text-xs">{p.id.slice(0, 8)}...</td>
                  <td className="py-4">{p.apps?.name}</td>
                  <td className="py-4">{p.profiles?.email || 'Unknown'}</td>
                  <td className="py-4">${p.amount}</td>
                  <td className="py-4"><Badge variant={p.status === 'completed' ? 'success' : p.status === 'failed' ? 'destructive' : 'pending'}>{p.status}</Badge></td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updatePaymentStatus(p.id, 'completed')}>Complete</Button>
                      <Button size="sm" variant="destructive" onClick={() => updatePaymentStatus(p.id, 'failed')}>Fail</Button>
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
