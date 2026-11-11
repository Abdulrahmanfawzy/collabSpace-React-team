
interface ProgressBarProps {
  current?: number;
  total?: number;
  value?: number;
  color?: string;
  trackColor?: string;
}

function ProgressBar({
  current = 0,
  total = 100,
  value,
  color = "bg-amber-500",
  trackColor = "bg-amber-100",
}: ProgressBarProps) {

  // Calculate percentage
  const percentage =
    value !== undefined ? value : (total > 0 ? (current / total) * 100 : 0);

  const displayText =
    value !== undefined ? `${value}%` : `${current}/${total}`;

  return (
    <div className="w-full">
      <div className="flex justify-end text-xs text-gray-400 mb-1 font-medium">
        <span>{displayText}</span>
      </div>

      <div className={`w-full h-2 rounded-full overflow-hidden ${trackColor}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
