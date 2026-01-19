import Image from "next/image";

interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  showClearIcon?: boolean;
}

export default function TextArea({
  value,
  onChange,
  placeholder = "답변을 작성해주세요.",
  disabled = false,
  height = 150,
  showClearIcon = true,
}: TextAreaProps) {
  const handleClear = () => {
    onChange?.("");
  };

  return (
    <div className="flex items-start gap-1">
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          height: `${height}px`,
          minHeight: `${Math.min(height, 150)}px`,
        }}
        className="text-body-md min-w-[100px] flex-1 resize-none rounded border border-gray-200 bg-white p-3  text-gray-800 placeholder:text-gray-800 focus:border-pink focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
      />
      {showClearIcon && (
        <button
          type="button"
          onClick={handleClear}
          className="flex h-9 w-9 items-center justify-center"
          aria-label="내용 삭제"
          disabled={disabled}
        >
          <Image
            src="/icons/basic/trash-line.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}
