export function Input({
  className,
  type = 'text',
  ...props
}: {
  className?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={`flex h-11 w-full rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: {
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex w-full min-h-[96px] rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
      {...props}
    />
  );
}

export function Label({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <label className={`text-sm font-medium text-[#cbd5e1] mb-1.5 block ${className ?? ''}`}>
      {children}
    </label>
  );
}
