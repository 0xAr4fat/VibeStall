import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}

export const supabase = (new Proxy({}, {
  get(_target, prop: string) {
    const client = getSupabase();
    if (!client) {
      return () => {
        throw new Error('Supabase not configured.');
      };
    }
    return (client as any)[prop];
  },
}) as unknown) as SupabaseClient;
