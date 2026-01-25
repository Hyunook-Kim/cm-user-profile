import Image from "next/image";
import OtherOptionInput from "./OtherOptionInput";

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
  const otherOptionValue = hasOtherOption ? options[options.length - 1]?.value : null;

  const handleToggle = (tagValue: string) => {
    const isSelected = value.includes(tagValue);

    if (isSelected) {
      onChange?.(value.filter((v) => v !== tagValue));
      // 기타 옵션 해제 시 텍스트 클리어
      if (tagValue === otherOptionValue) {
        onOtherChange?.("");
      }
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
          <label
            key={option.value}
            className={`flex h-8 min-h-[27px] cursor-pointer items-center gap-1 py-1 ${
              isDisabled ? "cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleToggle(option.value)}
              disabled={isDisabled}
              className="sr-only"
            />
            <Image
              src={getCheckIcon(isSelected)}
              alt=""
              width={20}
              height={20}
            />
            {isOtherOption ? (
              <OtherOptionInput
                label={option.label}
                value={otherValue}
                onChange={(val) => onOtherChange?.(val)}
                disabled={!isSelected}
              />
            ) : (
              <span
                className={`text-body-md ${
                  isDisabled ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {option.label}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
