import Image from "next/image";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// Fixed content from Figma spec (help-modal-direct.md)
const HELP_MODAL_CONTENT = `• 진지한 만남을 위하여 사진 및 셀프영상은 필수요건입니다.
• 밝은 표정의 얼굴이 잘 드러난 매력 사진 2~3장 이상 꼭 첨부 부탁드립니다.
• 마스크를 벗은 얼굴 식별이 가능한 사진으로 올려주세요.
• AI 프로필 사진은 등록이 불가합니다.`;

export default function HelpModal({ isOpen, onClose, title }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Container - 375px 기준, 반응형 */}
      <div className="relative z-10 flex w-full max-w-[343px] flex-col gap-3 rounded-lg bg-white p-5">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/basic/question-line.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-header-md text-black">{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center"
            aria-label="닫기"
          >
            <Image
              src="/icons/basic/close-line.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Body Text - Fixed content */}
        <p className="whitespace-pre-line text-body-md text-black">
          {HELP_MODAL_CONTENT}
        </p>
      </div>
    </div>
  );
}
