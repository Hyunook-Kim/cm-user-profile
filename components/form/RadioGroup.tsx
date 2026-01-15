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
  name: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  layout = "horizontal",
  name,
}: RadioGroupProps) {
  const layoutStyles = {
    horizontal: "flex flex-row flex-wrap gap-[18px]",
    vertical: "flex flex-col gap-[18px]",
    grid: "grid grid-cols-2 gap-[18px]",
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
            <span className="text-[14px] font-extralight leading-[20px] text-[#2B2B2B]">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
