import StatusBar from "@/components/layout/StatusBar";
import GestureBar from "@/components/layout/GestureBar";

interface ProfileEditLayoutProps {
  children: React.ReactNode;
}

export default function ProfileEditLayout({
  children,
}: ProfileEditLayoutProps) {
  return (
    <div className="mx-auto min-h-screen min-w-[--viewport-min] max-w-[--viewport-max] rounded-[28px] bg-white">
      <StatusBar />
      {children}
      <GestureBar />
    </div>
  );
}
