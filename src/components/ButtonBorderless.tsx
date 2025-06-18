import { cn } from "../utils/Cn";

interface ButtonBorderlessProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function ButtonBorderless({
  children,
  className,
  loading,
  onClick,
  type,
}: ButtonBorderlessProps) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute top-[3px] left-[3px] w-full h-full bg-[var(--color-secondary)]/40 rounded-lg"></span>
      <button
        type={type}
        disabled={loading}
        className={cn(
          "w-full relative cursor-pointer px-4 py-2 bg-[var(--color-secondary)]/40 text-white rounded-lg border-2 border-[var(--color-secondary)] transition-all duration-100 ease-in-out hover:translate-y-[3px] hover:translate-x-[3px]",
          {
            "opacity-50 cursor-not-allowed": loading,
          }
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
