import NoticeText from "@/components/ui/NoticeText";

interface CardProps {
  children: React.ReactNode;
  label: string;
  noticeText?: string;
  secondaryText?: string;
  helpIcon?: React.ReactNode;
}

export default function Card({
  children,
  label,
  noticeText,
  secondaryText,
  helpIcon,
}: CardProps) {
  return (
    <div className="flex flex-col gap-3 self-stretch rounded-lg border border-gray-100 bg-white px-6 py-5">
      {/* Question wrapper: Figma flex-col, gap: 4px */}
      <div className="flex flex-col gap-1">
        {/* Title row */}
        <div className="flex items-center gap-1">
          <span className="text-body-lg tracking-[-0.01em] text-black">
            {label}
          </span>
          {helpIcon}
        </div>

        {/* Conditions row: Figma flex-row, gap: 8px */}
        {(noticeText || secondaryText) && (
          <div className="flex flex-row items-center gap-2">
            {noticeText && <NoticeText text={noticeText} />}
            {secondaryText && (
              <span className="text-caption-lg text-gray-500">
                {secondaryText}
              </span>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
