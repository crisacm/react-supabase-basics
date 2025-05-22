import { cn } from "../utils/Cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className="relative">
      <span className="absolute top-[3px] left-[3px] w-full h-full bg-[var(--color-secondary)]/40 rounded-2xl"></span>
      <div
        className={cn(
          "relative rounded-2xl bg-[var(--color-primary)] p-6 w-full max-w-md border border-gray-600",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
