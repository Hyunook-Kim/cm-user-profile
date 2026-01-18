import Image from "next/image";

interface AddButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function AddButton({
  label = "추가",
  onClick,
}: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center gap-1 rounded-md bg-gray-100 px-3 py-1"
    >
      <Image
        src="/icons/basic/add-circle-line.svg"
        alt=""
        width={16}
        height={16}
      />
      <span className="text-[14px] font-normal leading-[20px] text-gray-800">
        {label}
      </span>
    </button>
  );
}
