export const metadata = {
  title: 'VibeStall',
  description: 'Marketplace for vibecoded apps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo-icon.svg" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="VibeStall" />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
