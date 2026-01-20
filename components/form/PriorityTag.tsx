import Image from "next/image";

interface PriorityTagProps {
  /** 1-based 순위 번호 */
  rank: number;
  /** 라벨 텍스트 */
  label: string;
  /** 드래그 중 여부 */
  isDragging?: boolean;
  /** 드래그 시작 핸들러 */
  onDragStart?: () => void;
  /** 드래그 오버 핸들러 */
  onDragOver?: (e: React.DragEvent) => void;
  /** 드롭 핸들러 */
  onDrop?: () => void;
}

/**
 * 조건 우선순위 태그 컴포넌트
 *
 * 피그마 스펙 (imagebox-priority.md):
 * - Container: 89px width (auto), 32px height, padding 8px, gap 4px
 * - Background: #FFFFFF, Border: 1px solid #E4E4E4, Border-radius: 8px
 * - Leading icon: 16x16 number icon (pink)
 * - Text: 12px/16px, font-weight 500, color #2E364C (navy)
 * - Trailing icon: 14x14 drag icon (navy)
 */
export default function PriorityTag({
  rank,
  label,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDrop,
}: PriorityTagProps) {
  // 숫자 아이콘 경로 (1~7까지 지원)
  const numberIconPath = `/icons/number/number-${Math.min(rank, 7)}.svg`;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`box-border flex cursor-grab flex-row items-center gap-1 rounded-lg border bg-white px-2 py-2 active:cursor-grabbing ${
        isDragging
          ? "border-pink opacity-50"
          : "border-gray-200"
      }`}
      style={{ height: "32px" }}
    >
      {/* Leading icon - Number */}
      <Image
        src={numberIconPath}
        alt={`${rank}위`}
        width={16}
        height={16}
        className="flex-none"
      />

      {/* Label text */}
      <span className="text-caption-md text-navy whitespace-nowrap">
        {label}
      </span>

      {/* Trailing icon - Close */}
      <Image
        src="/icons/basic/close-line.svg"
        alt=""
        width={14}
        height={14}
        className="flex-none"
      />
    </div>
  );
}
