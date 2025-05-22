export default function ErrorInput({ errors }: { errors: string }) {
  return (
    <span className="flex items-center gap-3 px-2">
      <i className="fa-solid fa-circle-exclamation text-red-400"></i>
      <p className="text-sm font-semibold text-gray-600">{errors}</p>
    </span>
  );
}
