"use client";

import { usePathname } from "next/navigation";
import StatusBar from "@/components/layout/StatusBar";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/layout/ProgressBar";
import FooterNav from "@/components/layout/FooterNav";
import GestureBar from "@/components/layout/GestureBar";

interface ProfileEditLayoutProps {
  children: React.ReactNode;
}

export default function ProfileEditLayout({
  children,
}: ProfileEditLayoutProps) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : 1;

  return (
    <div className="mx-auto min-h-screen min-w-[--viewport-min] max-w-[--viewport-max] rounded-[28px] bg-white">
      <StatusBar />
      <Header />
      <ProgressBar step={currentStep} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        {children}
      </main>
      <FooterNav showPrev={currentStep > 1} />
      <GestureBar />
    </div>
  );
}
