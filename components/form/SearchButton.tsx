import Image from "next/image";

interface SearchButtonProps {
  label: string;
  onClick?: () => void;
}

export default function SearchButton({ label, onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[36px] items-center justify-center gap-1 rounded bg-navy p-2"
    >
      <Image
        src="/icons/basic/search-line-white.svg"
        alt=""
        width={16}
        height={16}
      />
      <span className="text-[14px] font-extralight leading-[20px] text-white">
        {label}
      </span>
    </button>
  );
}
