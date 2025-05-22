import { cn } from "../utils/Cn";

interface SelectProps {
  className?: string;
  options: string[];
  register: any;
}

export default function Select({ className, options, register }: SelectProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer form-select w-full pr-4 rounded-lg border border-gray-500 bg-[var(--color-background)] transition-all duration-300 ease-in-out",
        className
      )}
    >
      <select {...register} className="w-full px-4 py-2">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
