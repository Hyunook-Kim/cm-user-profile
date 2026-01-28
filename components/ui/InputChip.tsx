type InputChipStatus = "off" | "none";

interface InputChipProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  status?: InputChipStatus;
  placeholder?: string;
  maxLength?: number;
}

const statusStyles: Record<InputChipStatus, string> = {
  off: "bg-white border border-gray-200 text-gray-500 placeholder:text-gray-500",
  none: "bg-gray-100 border-0 text-gray-300 placeholder:text-gray-300",
};

export default function InputChip({
  value,
  onChange,
  onSubmit,
  status = "off",
  placeholder = "8글자 이내",
  maxLength = 8,
}: InputChipProps) {
  const isDisabled = status === "none";

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      disabled={isDisabled}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`h-8 w-[81px] rounded-full px-3 py-2 text-caption-md outline-none ${statusStyles[status]} ${isDisabled ? "cursor-not-allowed" : ""}`}
    />
  );
}
