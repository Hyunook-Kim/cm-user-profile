import Button from "@/components/common/Button";

interface FooterNavProps {
  onPrev?: () => void;
  onSave?: () => void;
  onNext?: () => void;
  showPrev?: boolean;
  nextLabel?: string;
  saveLabel?: string;
  isSaving?: boolean;
  /**
   * Step별 버튼 레이아웃
   * - default: Step 1 (이전 없음, 저장 outline, 다음 primary)
   * - middle: Step 2~6 (이전, 저장 primary, 다음 outline)
   * - final: Step 7 (이전, 완료 primary, 다음 없음)
   */
  variant?: "default" | "middle" | "final";
}

export default function FooterNav({
  onPrev,
  onSave,
  onNext,
  showPrev = true,
  nextLabel = "다음",
  saveLabel = "저장",
  isSaving = false,
  variant = "default",
}: FooterNavProps) {
  const isMiddleVariant = variant === "middle";
  const isFinalVariant = variant === "final";
  const showNext = !isFinalVariant;

  // 저장/완료 버튼 스타일: middle, final은 primary / default는 outline
  const saveButtonVariant = isMiddleVariant || isFinalVariant ? "primary" : "outline";
  // 다음 버튼 스타일: middle은 outline / default는 primary
  const nextButtonVariant = isMiddleVariant ? "outline" : "primary";

  return (
    <footer className="fixed left-0 right-0 bottom-6 mx-auto flex h-[72px] min-w-[--viewport-min] max-w-[--viewport-max] items-center justify-center gap-2 border-t-2 border-gray-100 bg-white p-4">
      {showPrev && (
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isSaving}
          className="flex-1"
        >
          이전
        </Button>
      )}
      <Button
        variant={saveButtonVariant}
        onClick={onSave}
        disabled={isSaving}
        className="min-w-[120px] flex-1"
      >
        {isSaving ? "저장 중..." : saveLabel}
      </Button>
      {showNext && (
        <Button
          variant={nextButtonVariant}
          onClick={onNext}
          disabled={isSaving}
          className="flex-1"
        >
          {nextLabel}
        </Button>
      )}
    </footer>
  );
}
