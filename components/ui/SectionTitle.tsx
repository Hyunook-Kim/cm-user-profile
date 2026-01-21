interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-lg text-black">{title}</span>
      {subtitle && (
        <div className="flex items-start">
          <span className="text-caption-lg leading-[12px] text-pink">*</span>
          <span className="text-caption-lg text-pink">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
