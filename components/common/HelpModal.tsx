import Image from "next/image";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function HelpModal({
  isOpen,
  onClose,
  title,
  children,
}: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 mx-4 w-full max-w-[327px] rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-medium leading-[24px] text-[#1F1F1F]">
            {title}
          </h3>
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

        <div className="text-[14px] font-extralight leading-[20px] text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
}
