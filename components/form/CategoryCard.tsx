import Chip from "@/components/ui/Chip";

interface CategoryCardProps {
  label: string;
  tags: string[];
  selectedTags: string[];
  maxSelect: number;
  onToggle: (tag: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function CategoryCard({
  label,
  tags,
  selectedTags,
  maxSelect,
  onToggle,
  isFirst = false,
  isLast = false,
}: CategoryCardProps) {
  const isMaxReached = selectedTags.length >= maxSelect;

  const roundedClass =
    isFirst && isLast
      ? "rounded-lg"
      : isFirst
        ? "rounded-t-lg"
        : isLast
          ? "rounded-b-lg"
          : "";

  const borderClass = isFirst ? "border" : "border border-t-0";

  // Chip status 결정: on (선택됨), off (미선택), none (비활성화)
  const getChipStatus = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    if (isSelected) return "on";
    if (isMaxReached) return "none";
    return "off";
  };

  return (
    <div
      className={`flex flex-col gap-3 bg-white p-5 ${roundedClass} ${borderClass} border-gray-100`}
    >
      <span className="text-caption-lg text-black">{label}</span>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            text={tag}
            status={getChipStatus(tag)}
            onClick={() => onToggle(tag)}
          />
        ))}
      </div>
    </div>
  );
}
