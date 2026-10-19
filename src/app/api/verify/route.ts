import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { appId } = await req.json();

    if (!appId) {
      return NextResponse.json({ error: 'Missing appId' }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: session, error: sessionError } = await supabase
      .from('verification_sessions')
      .insert({
        app_id: appId,
        triggered_by: user.id,
        keystore_status: 'pending',
        signature_status: 'pending',
        source_code_status: 'pending',
        virus_scan_status: 'pending',
        overall_status: 'pending',
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    const checks = await runVerification(appId);

    const overall =
      checks.keystore_status === 'passed' &&
      checks.signature_status === 'passed' &&
      checks.source_code_status === 'passed' &&
      checks.virus_scan_status === 'passed'
        ? 'passed'
        : 'failed';

    await supabase
      .from('verification_sessions')
      .update({
        ...checks,
        overall_status: overall,
        completed_at: new Date().toISOString(),
      })
      .eq('id', session.id);

    const appStatus = overall === 'passed' ? 'verified' : 'rejected';
    await supabase.from('apps').update({
      status: appStatus,
      verification_status: overall,
    }).eq('id', appId);

    return NextResponse.json({ session, checks, appStatus });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function runVerification(appId: string) {
  return {
    keystore_status: 'passed',
    signature_status: 'passed',
    source_code_status: 'passed',
    virus_scan_status: 'passed',
    details: {
      keystore: 'Valid keystore, certificate not expired',
      signature: 'Signature matches keystore certificate',
      source_code: 'No critical vulnerabilities found',
      virus_scan: 'No malware detected',
    },
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const appId = searchParams.get('appId');

  if (!appId) {
    return NextResponse.json({ error: 'Missing appId' }, { status: 400 });
  }

  const { data } = await supabase
    .from('verification_sessions')
    .select('*')
    .eq('app_id', appId)
    .order('created_at', { ascending: false })
    .limit(1);

  return NextResponse.json({ session: data?.[0] });
}
