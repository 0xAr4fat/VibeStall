'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SellerUpload() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    short_description: '',
    category_id: '',
    price: '',
    platform: '',
    app_version: '',
  });
  const [files, setFiles] = useState({
    source_code: null as File | null,
    keystore: null as File | null,
    signature: null as File | null,
    app_icon: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('categories').select('*').eq('is_active', true).then(({ data }) => setCategories(data || []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const uploadPromises: Promise<string>[] = [];
      const fileMap: Record<string, File | null> = files;
      for (const [key, file] of Object.entries(fileMap)) {
        if (file) {
          uploadPromises.push(
            supabase.storage.from('app-files').upload(`${user.id}/${Date.now()}-${file.name}`, file).then(({ data, error }) => {
              if (error) throw error;
              const { data: { publicUrl } } = supabase.storage.from('app-files').getPublicUrl(data.path);
              return publicUrl;
            })
          );
        } else {
          uploadPromises.push(Promise.resolve(''));
        }
      }
      const urls = await Promise.all(uploadPromises);
      const [sourceCodeUrl, keystoreUrl, signatureUrl, appIconUrl] = urls;
      const { error: appError } = await supabase.from('apps').insert({
        seller_id: user.id,
        category_id: form.category_id || null,
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        description: form.description,
        short_description: form.short_description,
        app_icon_url: appIconUrl,
        source_code_url: sourceCodeUrl,
        price: parseFloat(form.price) || 0,
        app_version: form.app_version || null,
        platform: form.platform || null,
        status: 'pending',
        verification_status: 'pending',
      });
      if (appError) throw appError;
      alert('App submitted for verification!');
      setUploading(false);
      window.location.href = '/dashboard/seller';
    } catch (err: any) {
      alert(err.message || 'Upload failed');
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Upload Your App</h1>
            <p className="text-[#94a3b8]">Submit your vibecoded app for verification and listing.</p>
          </div>
          <Button asChild><a href="/dashboard/seller">Back to Dashboard</a></Button>
        </div>

        <Card>
          <div className="p-6">
            <h3 className="font-bold mb-6">App Information</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>App Name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="My Awesome App"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  placeholder="Brief app summary"
                />
              </div>

              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your app in detail..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Price (USD)</Label>
                  <Input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Input
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    placeholder="iOS, Android, Web..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>App Version</Label>
                  <Input
                    value={form.app_version}
                    onChange={(e) => setForm({ ...form, app_version: e.target.value })}
                    placeholder="1.0.0"
                  />
                </div>
              </div>

              <div className="border-t border-[#334155] pt-6 space-y-4">
                <h3 className="font-bold mb-2">Required Files</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload label="Source Code (.zip)" accepted=".zip" file={files.source_code} onChange={(f) => setFiles({ ...files, source_code: f })} required />
                  <FileUpload label="Keystore File" accepted=".jks,.keystore,.p12" file={files.keystore} onChange={(f) => setFiles({ ...files, keystore: f })} required />
                  <FileUpload label="Signature File" accepted=".sig,.rsa,.signature" file={files.signature} onChange={(f) => setFiles({ ...files, signature: f })} required />
                  <FileUpload label="App Icon (PNG)" accepted=".png,.jpg,.webp" file={files.app_icon} onChange={(f) => setFiles({ ...files, app_icon: f })} />
                </div>
                <div className="p-4 rounded-xl bg-[#1e293b]/50 border border-[#334155]/50">
                  <p className="text-sm font-medium mb-1">Verification Process</p>
                  <p className="text-sm text-[#94a3b8]">Your app will be automatically scanned for vulnerabilities, keystore validity, and signature integrity.</p>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Submit for Verification'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FileUpload({ label, accepted, file, onChange, required }: { label: string; accepted: string; file: File | null; onChange: (f: File | null) => void; required?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {required && <span className="text-xs text-[#dc2626]">required</span>}
      </div>
      <div className="border-2 border-dashed border-[#334155] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:border-[#2563eb] transition-colors group" onClick={() => {
        const input = document.getElementById(`file-${label}`) as HTMLInputElement;
        input?.click();
      }}>
        <input id={`file-${label}`} type="file" accept={accepted} className="hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        {file ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#16a34a] font-medium truncate max-w-xs">{file.name}</span>
          </div>
        ) : (
          <span className="text-sm text-[#94a3b8]">Click to upload</span>
        )}
      </div>
    </div>
  );
}
