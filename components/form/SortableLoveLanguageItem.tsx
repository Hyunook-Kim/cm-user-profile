"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface SortableLoveLanguageItemProps {
  /** 고유 식별자 (정렬에 사용) */
  id: string;
  /** 1-based 순위 번호 */
  rank: number;
  /** 라벨 텍스트 */
  label: string;
  /** 설명 텍스트 */
  description: string;
  /** 아이콘 이름 */
  icon: string;
}

/**
 * 드래그 가능한 사랑의 언어 아이템 컴포넌트
 * @dnd-kit/sortable을 사용하여 터치/마우스/키보드 드래그 지원
 */
export default function SortableLoveLanguageItem({
  id,
  rank,
  label,
  description,
  icon,
}: SortableLoveLanguageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none", // 터치 드래그 시 스크롤 방지
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex cursor-grab items-center gap-3 rounded-lg border bg-white p-3 active:cursor-grabbing ${
        isDragging ? "border-pink opacity-50" : "border-gray-200"
      }`}
    >
      {/* Leading Icon */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        <Image
          src={`/icons/love-language/${icon}.svg`}
          alt=""
          width={20}
          height={20}
        />
      </div>

      {/* Text Area */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-caption-lg text-pink">{rank}위</span>
          <span className="text-caption-lg text-gray-800">{label}</span>
        </div>
        <span className="text-caption-md text-gray-500">{description}</span>
      </div>
    </div>
  );
}
