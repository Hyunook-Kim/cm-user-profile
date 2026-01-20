import Image from "next/image";

interface InputCardTextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  showClearIcon?: boolean;
}

export default function InputCardTextArea({
  value,
  onChange,
  placeholder = "답변을 작성해주세요.",
  disabled = false,
  height = 150,
  showClearIcon = true,
}: InputCardTextAreaProps) {
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
          // 스크롤바 숨김 (Firefox, IE, Chrome/Safari)
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="text-body-md min-w-[100px] flex-1 resize-none rounded border border-gray-200 bg-white p-3 text-gray-800 placeholder:text-gray-300 focus:border-pink focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 [&::-webkit-scrollbar]:hidden"
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
