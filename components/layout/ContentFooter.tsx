import Image from "next/image";
import Link from "next/link";

export default function ContentFooter() {
  return (
    <footer className="flex flex-col items-start gap-[18px] self-stretch px-0 py-3">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="flex h-12 w-[140px] items-center">
          <Image
            src="/icons/logos/logo.svg"
            alt="크리스천메이트"
            width={140}
            height={47}
          />
        </div>

        <nav className="flex flex-row flex-wrap content-start items-start gap-x-[18px] gap-y-2 self-stretch">
          <Link
            href="/about"
            className="min-w-[47px] text-gray-800"
            style={{ fontSize: "12px" }}
          >
            회사소개
          </Link>
          <Link
            href="/terms"
            className="min-w-[47px] text-gray-800"
            style={{ fontSize: "12px" }}
          >
            이용약관
          </Link>
          <Link
            href="/privacy"
            className="min-w-[93px] text-caption-md text-black"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/compensation"
            className="min-w-[93px] text-gray-800"
            style={{ fontSize: "12px" }}
          >
            손해배상청구절차
          </Link>
          <Link
            href="/child-safety"
            className="min-w-[103px] text-gray-800"
            style={{ fontSize: "12px" }}
          >
            아동 안전 표준 정책
          </Link>
        </nav>
      </div>

      <div className="flex flex-row flex-wrap content-start items-start gap-x-3 gap-y-2 self-stretch">
        <span className="flex min-w-[122px] items-center text-caption-sm text-gray-500">
          상호명 : (주)크리스천메이트
        </span>
        <span className="flex min-w-[60px] items-center text-caption-sm text-gray-500">
          대표 : 임성진
        </span>
        <span className="flex min-w-[149px] items-center text-caption-sm text-gray-500">
          사업자등록번호 : 247-86-02178
        </span>
        <span className="flex min-w-[220px] items-center text-caption-sm text-gray-500">
          결혼중개업 신고번호 : 서울-강남-국내-23-0005호
        </span>
        <span className="flex min-w-[259px] items-center text-caption-sm text-gray-500">
          주소 : 서울 강남구 테헤란로 120 12층 크리스천메이트센터
        </span>
        <span className="flex min-w-[169px] items-center text-caption-sm text-gray-500">
          통신판매신고 : 2023-서울강남-02565
        </span>
      </div>

      <div className="flex flex-row flex-wrap content-start items-start gap-x-3 gap-y-2 self-stretch">
        <span className="flex min-w-[92px] items-center text-caption-sm text-gray-500">
          TEL : 02-862-3920
        </span>
        <span className="flex min-w-[94px] items-center text-caption-sm text-gray-500">
          FAX : 02-585-3920
        </span>
        <span className="flex min-w-[159px] items-center text-caption-sm text-gray-500">
          E-mail : webmaster@c-mate.co.kr
        </span>
        <span className="flex min-w-[233px] items-center text-caption-sm text-gray-500">
          개인정보보호책임자 : 임성진 (sjyc00@c-mate.co.kr)
        </span>
        <span className="flex min-w-[249px] items-center text-caption-sm text-gray-500">
          2016 Copyright(c) 크리스천 메이트 All Right Reserved.
        </span>
      </div>
    </footer>
  );
}
