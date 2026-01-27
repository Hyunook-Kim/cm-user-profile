import Image from "next/image";

interface SelectedChipProps {
  text: string;
  onRemove: () => void;
}

export default function SelectedChip({ text, onRemove }: SelectedChipProps) {
  return (
    <div className="inline-flex h-8 items-center gap-1 rounded-full border border-pink bg-white px-3 py-2">
      <span className="text-caption-md text-pink">{text}</span>
      <button
        type="button"
        onClick={onRemove}
        className="flex h-[14px] w-[14px] items-center justify-center"
      >
        <Image
          src="/icons/basic/close-line-pink.svg"
          alt="삭제"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
}
