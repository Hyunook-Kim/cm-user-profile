interface ProgressBarProps {
  step: number;
  totalSteps?: number;
}

export default function ProgressBar({
  step,
  totalSteps = 7,
}: ProgressBarProps) {
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="relative h-1 w-full">
      <div className="absolute inset-0 bg-gray-200" />

      <div
        className="absolute left-0 top-0 h-full bg-navy transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}
