import Button from "@/components/common/Button";

interface FooterNavProps {
  onPrev?: () => void;
  onSave?: () => void;
  onNext?: () => void;
  showPrev?: boolean;
  nextLabel?: string;
}

export default function FooterNav({
  onPrev,
  onSave,
  onNext,
  showPrev = true,
  nextLabel = "다음",
}: FooterNavProps) {
  return (
    <footer className="fixed left-0 right-0 bottom-6 mx-auto flex h-[72px] min-w-[--viewport-min] max-w-[--viewport-max] items-center justify-center gap-2 border-t-2 border-gray-100 bg-white p-4">
      {showPrev && (
        <Button variant="outline" onClick={onPrev} className="flex-1">
          이전
        </Button>
      )}
      <Button variant="outline" onClick={onSave} className="flex-1">
        저장
      </Button>
      <Button variant="primary" onClick={onNext} className="flex-1">
        {nextLabel}
      </Button>
    </footer>
  );
}
