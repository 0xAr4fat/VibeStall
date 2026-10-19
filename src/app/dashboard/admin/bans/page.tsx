'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminBans() {
  const [banned, setBanned] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBans();
  }, []);

  async function fetchBans() {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('is_banned', true).order('banned_at', { ascending: false });
      setBanned(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function unbanUser(userId: string) {
    const { error } = await supabase.from('profiles').update({ is_banned: false, ban_reason: null, banned_at: null, banned_by: null }).eq('id', userId);
    if (!error) fetchBans();
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
        <h1 className="text-2xl font-bold tracking-tight mb-8">User Bans</h1>
        <Card>
          <div className="p-6">
            <h3 className="font-bold mb-4">Banned Users</h3>
            <div className="space-y-4">
              {banned.length > 0 ? (
                banned.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl border border-[#334155] bg-[#111827] flex items-center justify-between">
                    <div>
                      <p className="font-medium">{u.full_name || 'Unknown'}</p>
                      <p className="text-sm text-[#94a3b8]">{u.email}</p>
                      <p className="text-xs text-[#94a3b8] mt-1">Reason: {u.ban_reason || 'Not specified'}</p>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => unbanUser(u.id)}>Unban</Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#94a3b8] text-center py-8">No banned users.</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
