import Image from "next/image";

interface NoticeTextProps {
  text: string;
}

export default function NoticeText({ text }: NoticeTextProps) {
  return (
    <span className="flex items-center text-caption-lg text-pink">
      <Image
        src="/icons/notice-asterisk.svg"
        alt=""
        width={7}
        height={20}
      />
      {text}
    </span>
  );
}
