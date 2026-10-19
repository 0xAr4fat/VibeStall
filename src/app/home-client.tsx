'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, ShieldCheck, CheckCircle, DollarSign, Download, Code, Layers, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Code,
    title: 'Source Code Included',
    desc: 'Every app comes with full source code so you can modify and extend it.',
  },
  {
    icon: ShieldCheck,
    title: 'Keystore & Signature Verified',
    desc: 'Automatic verification of keystore and app signatures for security.',
  },
  {
    icon: Zap,
    title: 'Auto Security Scan',
    desc: 'Vulnerability and virus scanning before any app is approved.',
  },
  {
    icon: DollarSign,
    title: 'Secure Payments',
    desc: 'Escrow-style payments with platform protection for buyers and sellers.',
  },
];

const categories = [
  { name: 'Mobile Apps', count: 124, color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Web Apps', count: 89, color: 'bg-purple-500/20 text-purple-400' },
  { name: 'Games', count: 67, color: 'bg-pink-500/20 text-pink-400' },
  { name: 'AI & ML Tools', count: 43, color: 'bg-emerald-500/20 text-emerald-400' },
  { name: 'Productivity', count: 38, color: 'bg-orange-500/20 text-orange-400' },
  { name: 'Design & Creative', count: 31, color: 'bg-rose-500/20 text-rose-400' },
];

const stats = [
  { label: 'Apps Listed', value: '2.4k+' },
  { label: 'Happy Buyers', value: '12k+' },
  { label: 'Sellers', value: '850+' },
  { label: 'Total Sales', value: '$4.2M+' },
];

export default function HomeClient() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="VibeStall" className="h-10 w-10" />
            <span className="text-2xl font-bold tracking-tight text-primary">VibeStall</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/marketplace" className="hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>
          <Button className="hidden md:block">List Your App</Button>
          <Button variant="outline" className="md:hidden">
            Menu
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-background/80 to-background py-24 px-6">
          <div className="mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium text-muted-foreground mb-8">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Now accepting vibecoded apps
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Buy and sell{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                vibecoded apps
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              The marketplace for vibecoded applications. Every listing includes source code,
              keystore, and verified signatures. Auto-verified for security before approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto">
                <ArrowRight className="h-5 w-5 mr-2" />
                Browse Marketplace
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/auth/signup">Sell Your App</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Built for creators and buyers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to trade vibecoded apps safely.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-border bg-card hover:bg-card/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="py-24 px-6 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Categories</h2>
              <Link href="/marketplace" className="text-primary font-medium hover:underline">
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href="/marketplace"
                  className="group p-6 rounded-xl border border-border bg-card hover:bg-card/50 hover:border-primary/50 transition-all"
                >
                  <div className={`${cat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} apps</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-2">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Security First</h3>
                <p className="text-muted-foreground">
                  Every app is scanned for vulnerabilities, keystore validity, and signature
                  integrity.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Source Code Included</h3>
                <p className="text-muted-foreground">
                  Full source access so you own what you buy — no black boxes.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-2">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Instant Download</h3>
                <p className="text-muted-foreground">
                  Secure delivery after payment confirmation with expiry-protected links.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-primary p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">Ready to sell your vibecoded app?</h2>
              <p className="text-primary-foreground/80 mb-8">
                Join hundreds of sellers monetizing their creations.
              </p>
              <Button size="lg" asChild>
                <Link href="/auth/signup" className="text-primary">
                  Get Started as a Seller
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="VibeStall" className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight">VibeStall</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} VibeStall. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/auth/login" className="hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="hover:text-foreground transition-colors">
              Sign up
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
