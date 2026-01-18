import Image from "next/image";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  layout?: "horizontal" | "vertical" | "grid";
  columns?: 2 | 3;
  name: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  layout = "horizontal",
  columns = 2,
  name,
}: RadioGroupProps) {
  const layoutStyles = {
    horizontal: "flex flex-row flex-wrap gap-y-[4px] gap-x-[18px]",
    vertical: "flex flex-col gap-[18px]",
    grid: "flex flex-row flex-wrap gap-y-[4px] gap-x-[18px]",
  };

  return (
    <div className={layoutStyles[layout]}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-1"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={(e) => onChange?.(e.target.value)}
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
            <span className="text-[14px] font-light leading-[24px] text-gray-800">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
