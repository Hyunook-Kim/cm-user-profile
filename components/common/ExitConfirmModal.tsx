"use client";

import Image from "next/image";

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
  isSaving?: boolean;
}

export default function ExitConfirmModal({
  isOpen,
  onClose,
  onSave,
  onDiscard,
  isSaving = false,
}: ExitConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 콘텐츠 - 피그마 스펙: width 343px, padding 20px, gap 12px */}
      <div className="relative z-10 flex w-[343px] flex-col gap-3 rounded-lg bg-white p-5">
        {/* Title - 피그마 스펙: space-between, icon + text (left) + close icon (right) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/basic/caution-line.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[16px] font-medium leading-[20px] text-[#1F1F1F]">
              변경 내용을 저장하지 않았습니다
            </span>
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

        {/* Body - 피그마 스펙: 14px, weight 200, line-height 24px */}
        <p className="text-[14px] font-extralight leading-[24px] text-black">
          저장하지 않고 나가면 수정한 내용이 사라집니다.
          <br />
          저장 후 이동하시겠어요?
        </p>

        {/* 버튼 그룹 - 피그마 스펙: gap 12px, height 40px */}
        <div className="flex gap-3">
          {/* Primary 버튼 (저장 후 이동) - 피그마 스펙: bg #FF3A92, 16px, 500 */}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="h-10 flex-1 rounded-lg bg-pink px-4 py-3 text-[16px] font-medium leading-[20px] text-white disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장 후 이동"}
          </button>
          {/* Outline 버튼 (저장하지 않고 이동) - 피그마 스펙: border 1.5px #FF3A92, 16px, 500 */}
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="h-10 flex-1 rounded-lg border-[1.5px] border-pink bg-white px-4 py-3 text-[16px] font-medium leading-[20px] text-pink disabled:opacity-50"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
