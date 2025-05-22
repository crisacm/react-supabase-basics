import { cn } from "../utils/Cn";

interface InputProps {
  type: string;
  className?: string;
  placeholder: string;
  register: any;
}

export default function Input({
  type,
  className,
  placeholder,
  register,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className={cn(
        "w-full px-4 py-2 rounded-lg border border-gray-500 bg-[var(--color-background)] transition-all duration-300 ease-in-out",
        className
      )}
    />
  );
}
