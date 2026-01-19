"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
}

export default function Header({
  title = "프로필 수정",
  onBack,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-[52px] z-10 flex h-[54px] items-center bg-white px-1 py-2">
      <button
        type="button"
        onClick={handleBack}
        className="flex h-12 w-12 items-center justify-center"
        aria-label="뒤로가기"
      >
        <Image
          src="/icons/basic/arrow-left-s-line.svg"
          alt=""
          width={24}
          height={24}
        />
      </button>
      <h1 className="flex-1 text-center text-[20px] font-medium leading-[28px] text-[#1F1F1F]">
        {title}
      </h1>
      <div className="w-12" />
    </header>
  );
}
