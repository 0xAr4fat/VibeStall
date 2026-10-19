import { Metadata } from 'next';

export const metadata = {
  title: 'Blog - VibeStall',
  description: 'Guides on buying and selling vibecoded apps.',
};

const posts = [
  {
    title: 'How to Sell Your Vibecoded App',
    slug: '/blog/how-to-sell-your-vibecoded-app',
    description: 'Step-by-step guide to listing, verifying, and selling your vibecoded app.',
    date: 'Oct 19, 2026',
    category: 'Seller Guide',
  },
  {
    title: 'Buy App Source Code Guide',
    slug: '/blog/buy-app-source-code-guide',
    description: 'Complete guide to purchasing verified app source code.',
    date: 'Oct 19, 2026',
    category: 'Buyer Guide',
  },
  {
    title: 'Keystore & Signature Verification Explained',
    slug: '/blog/keystore-signature-verification-explained',
    description: 'How VibeStall verifies keystore integrity and app signatures.',
    date: 'Oct 19, 2026',
    category: 'Security',
  },
  {
    title: 'VibeStall Marketplace Security',
    slug: '/blog/vibecoded-app-marketplace-security',
    description: 'Security layers protecting buyers and sellers.',
    date: 'Oct 19, 2026',
    category: 'Security',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      <nav className="border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="VibeStall" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-[#2563eb]">VibeStall</span>
          </a>
          <a href="/marketplace" className="text-sm font-medium hover:text-[#2563eb] transition-colors">Marketplace</a>
        </div>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center gap-2 mb-10">
          <span className="text-[#94a3b8]">Blog</span>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        </div>
        <p className="text-[#94a3b8] mb-12">Guides, tutorials, and best practices for buying and selling vibecoded apps.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 rounded-xl border border-[#334155] bg-[#111827] hover:bg-[#111827]/80 transition-colors">
              <span className="text-xs font-medium text-[#2563eb] mb-2 block">{post.category}</span>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-[#94a3b8] mb-4 line-clamp-3">{post.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#334155]/50">
                <span className="text-xs text-[#64748b]">{post.date}</span>
                <a href={post.slug} className="text-sm font-medium text-[#2563eb] hover:underline">Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
