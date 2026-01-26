import NoticeText from "@/components/ui/NoticeText";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-lg text-black">{title}</span>
      {subtitle && <NoticeText text={subtitle} />}
    </div>
  );
}
