'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      setUsers(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function toggleBan(userId: string, isBanned: boolean) {
    const { error } = await supabase.from('profiles').update({ is_banned: !isBanned }).eq('id', userId);
    if (!error) fetchUsers();
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
        <h1 className="text-2xl font-bold tracking-tight mb-8">User Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="pb-3 font-medium text-[#94a3b8]">User</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Email</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Role</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Status</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Joined</th>
                <th className="pb-3 font-medium text-[#94a3b8]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[#334155]/50 hover:bg-[#1e293b] transition-colors">
                  <td className="py-4">{u.full_name || 'Unknown'}</td>
                  <td className="py-4">{u.email}</td>
                  <td className="py-4"><Badge variant={u.role === 'admin' ? 'destructive' : u.role === 'seller' ? 'secondary' : 'default'}>{u.role}</Badge></td>
                  <td className="py-4"><Badge variant={u.is_banned ? 'destructive' : 'success'}>{u.is_banned ? 'Banned' : 'Active'}</Badge></td>
                  <td className="py-4 text-[#94a3b8]">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-4">
                    <Button size="sm" variant={u.is_banned ? 'secondary' : 'destructive'} onClick={() => toggleBan(u.id, u.is_banned)}>
                      {u.is_banned ? 'Unban' : 'Ban'}
                    </Button>
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
