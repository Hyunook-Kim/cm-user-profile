import Image from "next/image";

interface TagOption {
  value: string;
  label: string;
}

interface TagGroupProps {
  options: TagOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelect?: number;
}

export default function TagGroup({
  options,
  value = [],
  onChange,
  maxSelect,
}: TagGroupProps) {
  const handleToggle = (tagValue: string) => {
    const isSelected = value.includes(tagValue);

    if (isSelected) {
      onChange?.(value.filter((v) => v !== tagValue));
    } else {
      if (maxSelect && value.length >= maxSelect) {
        return;
      }
      onChange?.([...value, tagValue]);
    }
  };

  const isMaxReached = maxSelect ? value.length >= maxSelect : false;

  const getCheckIcon = (isSelected: boolean) => {
    if (isSelected) return "/icons/check/check-on.svg";
    if (isMaxReached) return "/icons/check/check-none.svg";
    return "/icons/check/check-off.svg";
  };

  return (
    <div className="flex flex-wrap gap-y-[4px] gap-x-[8px]">
      {options.map((option) => {
        const isSelected = value.includes(option.value);
        const isDisabled = !isSelected && isMaxReached;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            disabled={isDisabled}
            className={`flex flex-row items-center gap-[4px] py-[4px] ${
              isDisabled ? "cursor-not-allowed" : ""
            }`}
          >
            <Image
              src={getCheckIcon(isSelected)}
              alt=""
              width={20}
              height={20}
            />
            <span
              className={`text-[14px] font-normal leading-[20px] ${
                isSelected
                  ? "text-gray-800"
                  : isDisabled
                    ? "text-gray-300"
                    : "text-gray-500"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
