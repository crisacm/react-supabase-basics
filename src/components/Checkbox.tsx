import { cn } from "../utils/Cn";

interface CheckboxProps {
  label: string;
  className?: string;
  register: any;
}

export default function Checkbox({
  label,
  className,
  register,
}: CheckboxProps) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <input type="checkbox" className="form-checkbox w-5 h-5" {...register} />
      <span className="text-gray-800">{label}</span>
    </label>
  );
}
