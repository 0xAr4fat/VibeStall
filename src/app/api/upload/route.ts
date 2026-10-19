import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const appId = formData.get('appId') as string;
    const type = formData.get('type') as string;

    if (!file || !appId || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileName = `${user.id}/${appId}/${type}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('app-files').upload(fileName, file);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('app-files').getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
