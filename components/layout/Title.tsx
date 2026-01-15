interface TitleProps {
  title: string;
  step: number;
  totalSteps?: number;
  subtitle?: string;
}

export default function Title({
  title,
  step,
  totalSteps = 7,
  subtitle,
}: TitleProps) {
  return (
    <div className="flex h-6 items-center justify-between self-stretch">
      <div className="flex items-center gap-1">
        <h2 className="text-[18px] font-medium leading-[24px] text-black">
          {title}
        </h2>
        {subtitle && (
          <span className="text-[14px] font-medium leading-[20px] text-pink">
            {subtitle}
          </span>
        )}
      </div>
      <span className="text-[18px] font-medium leading-[24px] text-black">
        {step} / {totalSteps}
      </span>
    </div>
  );
}
