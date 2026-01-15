import Image from "next/image";

interface HelpIconProps {
  color: "pink" | "gray";
  onClick?: () => void;
}

export default function HelpIcon({ color, onClick }: HelpIconProps) {
  const iconSrc =
    color === "pink"
      ? "/icons/basic/question-line-pink.svg"
      : "/icons/basic/question-line.svg";

  return (
    <button
      type="button"
      className="flex h-6 w-6 items-center justify-center"
      onClick={onClick}
      aria-label="도움말"
    >
      <Image src={iconSrc} alt="" width={24} height={24} />
    </button>
  );
}
