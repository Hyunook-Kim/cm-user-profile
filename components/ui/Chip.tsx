type ChipStatus = "on" | "off" | "none";

interface ChipProps {
  text: string;
  status?: ChipStatus;
  onClick?: () => void;
}

const statusStyles: Record<ChipStatus, string> = {
  off: "bg-white border border-gray-200 text-gray-800",
  on: "bg-white border border-pink text-pink",
  none: "bg-gray-100 text-gray-300 cursor-not-allowed",
};

export default function Chip({ text, status = "off", onClick }: ChipProps) {
  const isDisabled = status === "none";

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`inline-flex h-8 items-center rounded-full px-3 py-2 text-caption-md ${statusStyles[status]}`}
    >
      {text}
    </button>
  );
}
