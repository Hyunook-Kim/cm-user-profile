"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PriorityTag from "./PriorityTag";

interface SortablePriorityTagProps {
  /** 고유 식별자 (정렬에 사용) */
  id: string;
  /** 1-based 순위 번호 */
  rank: number;
  /** 라벨 텍스트 */
  label: string;
  /** X 버튼 클릭 핸들러 (제거) */
  onRemove?: () => void;
}

/**
 * 드래그 가능한 우선순위 태그 컴포넌트
 * @dnd-kit/sortable을 사용하여 터치/마우스/키보드 드래그 지원
 */
export default function SortablePriorityTag({
  id,
  rank,
  label,
  onRemove,
}: SortablePriorityTagProps) {
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PriorityTag
        rank={rank}
        label={label}
        isDragging={isDragging}
        onRemove={onRemove}
      />
    </div>
  );
}
