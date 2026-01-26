import Image from "next/image";
import OtherOptionInput from "./OtherOptionInput";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  layout?: "horizontal" | "vertical";
  name: string;
  /** "기타" 옵션의 value (예: "other") - 이 값이 설정되면 해당 옵션에 텍스트 입력 필드가 추가됨 */
  otherValue?: string;
  /** "기타" 텍스트 입력 필드의 현재 값 */
  otherInputValue?: string;
  /** "기타" 텍스트 입력 필드 변경 핸들러 */
  onOtherInputChange?: (value: string) => void;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  layout = "horizontal",
  name,
  otherValue,
  otherInputValue,
  onOtherInputChange,
}: RadioGroupProps) {
  const layoutStyles = {
    horizontal: "flex flex-row flex-wrap gap-y-[4px] gap-x-[18px]",
    vertical: "flex flex-col gap-1",
  };

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    // 기타 옵션이 아닌 다른 옵션 선택 시 텍스트 클리어
    if (otherValue && newValue !== otherValue) {
      onOtherInputChange?.("");
    }
  };

  return (
    <div className={layoutStyles[layout]}>
      {options.map((option) => {
        const isSelected = value === option.value;
        const isOtherOption = otherValue && option.value === otherValue;
        const isOtherSelected = isOtherOption && isSelected;

        return (
          <label
            key={option.value}
            className="flex h-8 min-h-[27px] cursor-pointer items-center gap-1"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={(e) => handleChange(e.target.value)}
              className="sr-only"
            />
            <Image
              src={
                isSelected
                  ? "/icons/radio/radio-on.svg"
                  : "/icons/radio/radio-off.svg"
              }
              alt=""
              width={20}
              height={20}
            />
            {isOtherOption ? (
              <OtherOptionInput
                label={option.label}
                value={otherInputValue ?? ""}
                onChange={(val) => onOtherInputChange?.(val)}
                disabled={!isOtherSelected}
              />
            ) : (
              <span className="text-body-md text-gray-800">{option.label}</span>
            )}
          </label>
        );
      })}
    </div>
  );
}
