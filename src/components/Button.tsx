import { cn } from "../utils/Cn";

interface ButtonProps {
  children: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({ children, className, type }: ButtonProps) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute top-[3px] left-[3px] w-full h-full bg-[var(--color-secondary)]/40 rounded-lg"></span>
      <button
        type={type}
        className="w-full relative cursor-pointer px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg border border-gray-500 transition-all duration-100 ease-in-out hover:translate-y-[3px] hover:translate-x-[3px]"
      >
        {children}
      </button>
    </div>
  );
}
