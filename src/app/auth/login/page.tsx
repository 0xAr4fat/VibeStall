'use client';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-16">
      <div className="mx-auto max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/logo.svg" alt="VibeStall" className="mx-auto h-14 w-14 mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-[#94a3b8]">Sign in to your account</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#cbd5e1]">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="flex h-11 w-full rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-[#64748b]"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-[#cbd5e1]">
                Password
              </label>
              <a href="#" className="text-sm text-[#2563eb] hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="flex h-11 w-full rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder:text-[#64748b]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0f172a] transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-[#94a3b8]">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-[#2563eb] font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
