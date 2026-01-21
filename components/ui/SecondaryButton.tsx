import Image from "next/image";

interface SecondaryButtonProps {
  label: string;
  icon?: string;
  onClick?: () => void;
}

export default function SecondaryButton({
  label,
  icon,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[36px] items-center justify-center gap-1 rounded bg-navy px-2"
      // className="flex h-[36px] items-center justify-center gap-1 rounded bg-navy p-2"
    >
      {icon && <Image src={icon} alt="" width={16} height={16} />}
      {/* <span className="text-[14px] font-extralight leading-[20px] text-white"> */}
      <span className="text-caption-lg text-white">{label}</span>
    </button>
  );
}
