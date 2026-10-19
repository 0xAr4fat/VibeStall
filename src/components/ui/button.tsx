import * as React from 'react';

export function Button({
  className,
  children,
  type = 'button',
  onClick,
  disabled,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center rounded-xl border border-transparent px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    default: 'bg-[#2563eb] text-white hover:bg-[#3b82f6]',
    outline: 'border-[#334155] bg-transparent text-[#cbd5e1] hover:bg-[#1e293b]',
    destructive: 'bg-[#dc2626] text-white hover:bg-[#ef4444]',
    secondary: 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#60a5fa] hover:bg-[#3b82f6]/30',
    ghost: 'bg-transparent text-[#cbd5e1] hover:bg-[#1e293b]',
  };
  const sizes = {
    default: 'px-5 py-2.5 text-sm',
    sm: 'px-3 py-2 text-xs',
    lg: 'px-8 py-3 text-base',
  };
  const variantClass = variants[variant as keyof typeof variants] ?? '';
  const sizeClass = sizes[size as keyof typeof sizes] ?? sizes.default;
  const Comp = asChild ? React.Fragment : 'button';
  return (
    <Comp
      className={`${base} ${sizeClass} ${variantClass} ${className ?? ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  );
}
