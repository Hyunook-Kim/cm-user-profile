interface OtherOptionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function OtherOptionInput({
  label,
  value,
  onChange,
  disabled = false,
}: OtherOptionInputProps) {
  return (
    <div className="flex h-8 items-center gap-2">
      <span className="text-body-md text-gray-800">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`h-8 w-[100px] min-w-[100px] rounded border border-gray-200 px-2 py-1 text-body-md text-gray-800 focus:outline-none ${
          disabled ? "bg-gray-100" : "bg-white focus:border-pink"
        }`}
      />
    </div>
  );
}
