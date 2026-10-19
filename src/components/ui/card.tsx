export function Card({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-[#334155] bg-[#111827] p-6 ${className ?? ''}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }: { children?: React.ReactNode }) {
  return <h3 className="text-xl font-bold">{children}</h3>;
}

export function CardContent({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }: { children?: React.ReactNode }) {
  return <div className="mt-6">{children}</div>;
}
