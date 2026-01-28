import Image from "next/image";

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function AddButton({ onClick, disabled = false }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-full ${
        disabled
          ? "cursor-not-allowed bg-gray-100"
          : "border border-gray-200 bg-white"
      }`}
    >
      <Image
        src="/icons/basic/add-line-gray300.svg"
        alt="추가"
        width={12}
        height={12}
      />
    </button>
  );
}
