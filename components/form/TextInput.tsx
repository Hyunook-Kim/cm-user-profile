interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  disabled = false,
}: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="h-10 w-full rounded border border-gray-200 bg-white px-3 py-2 text-[14px] font-extralight leading-[20px] text-gray-800 placeholder:text-gray-400 focus:border-pink focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
    />
  );
}
