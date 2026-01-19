import { NextResponse } from "next/server";
import { getProfileData } from "@/lib/api/profile";

export async function GET() {
  const data = await getProfileData();

  if (data) {
    return NextResponse.json({
      success: true,
      message: "Supabase 연결 성공!",
      data,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "연결 실패 - 환경변수와 테이블을 확인하세요",
    },
    { status: 500 }
  );
}
