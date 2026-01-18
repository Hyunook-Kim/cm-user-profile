import Image from "next/image";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
}: DropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 w-full appearance-none rounded border border-gray-200 bg-white py-2 pl-3 pr-10 text-[14px] font-light leading-[20px] text-gray-800 focus:border-pink focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <Image
          src="/icons/basic/arrow-down-s-line.svg"
          alt=""
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
