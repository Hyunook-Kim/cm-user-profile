import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "크리스천메이트 프로필 수정",
  description: "크리스천메이트 프로필 수정 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
