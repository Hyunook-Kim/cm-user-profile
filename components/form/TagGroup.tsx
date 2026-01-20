"use client";

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
  /** 기타 옵션이 있는 경우 (마지막 옵션에 텍스트 입력 추가) */
  hasOtherOption?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function TagGroup({
  options,
  value = [],
  onChange,
  maxSelect,
  hasOtherOption = false,
  otherValue = "",
  onOtherChange,
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
    <div className="flex flex-wrap gap-x-[18px] gap-y-[4px]">
      {options.map((option, index) => {
        const isSelected = value.includes(option.value);
        const isDisabled = !isSelected && isMaxReached;
        const isLastOption = index === options.length - 1;
        const isOtherOption = hasOtherOption && isLastOption;

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
            {isOtherOption ? (
              <div className="flex items-center gap-2">
                <span
                  className={`text-body-md ${
                    isSelected
                      ? "text-gray-800"
                      : isDisabled
                        ? "text-gray-300"
                        : "text-gray-500"
                  }`}
                >
                  {option.label}
                </span>
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => {
                    e.stopPropagation();
                    onOtherChange?.(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={`h-[32px] w-[100px] rounded border border-gray-200 px-2 py-1 text-body-md text-gray-800 outline-none focus:border-pink ${
                    isSelected ? "bg-white" : "bg-gray-100"
                  }`}
                  placeholder=""
                />
              </div>
            ) : (
              <span
                className={`text-body-md ${
                  isDisabled ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {option.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
