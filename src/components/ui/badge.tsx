export function Badge({
  className,
  variant = 'default',
  children,
}: {
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'pending' | 'secondary';
  children?: React.ReactNode;
}) {
  const variants = {
    default: 'border-[#334155] bg-[#1e293b] text-[#cbd5e1]',
    success: 'bg-[#16a34a]/20 border-[#16a34a]/40 text-[#4ade80]',
    warning: 'bg-[#ca8a04]/20 border-[#ca8a04]/40 text-[#fbbf24]',
    destructive: 'bg-[#dc2626]/20 border-[#dc2626]/40 text-[#fca5a5]',
    secondary: 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#60a5fa]',
    pending: 'border-[#334155] bg-[#1e293b] text-[#94a3b8]',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
