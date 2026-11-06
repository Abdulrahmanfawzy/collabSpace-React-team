import { TrendingUp } from "lucide-react";

type CompletionRateCardProps = {
  title?: string;
  value: number; // 0 - 100
  change: string;
};

function CompletionRateCard({
  title = "Completion Rate",
  value,
  change,
}: CompletionRateCardProps) {
  const clamped = Math.min(100, Math.max(0, value));

  // Gauge geometry (semi-circle, opens at the bottom)
  const size = 110;
  const cx = size / 2;
  const cy = size / 2 + 8;
  const r = 44;
  const strokeWidth = 8;

  // Arc spans 220 degrees: from -200deg to 20deg (measured from the +x axis, clockwise)
  const startAngle = 160;
  const sweep = 220;

  const polar = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (from: number, to: number) => {
    const start = polar(from);
    const end = polar(to);
    const largeArc = to - from > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const endAngle = startAngle + sweep;
  const valueAngle = startAngle + (sweep * clamped) / 100;

  // Needle
  const needleLength = r - 14;
  const rad = (valueAngle * Math.PI) / 180;
  const needleX = cx + needleLength * Math.cos(rad);
  const needleY = cy + needleLength * Math.sin(rad);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-4xl font-bold text-black">{clamped}%</p>
          <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
            <TrendingUp size={12} className="text-green-600" />
            {change}
          </p>
        </div>

        <svg width={size} height={size - 10} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <path
            d={arcPath(startAngle, endAngle)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Filled value */}
          <path
            d={arcPath(startAngle, valueAngle)}
            fill="none"
            stroke="#1f2937"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="#1f2937"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r={4} fill="white" stroke="#1f2937" strokeWidth={2} />
        </svg>
      </div>
    </div>
  );
}

export default CompletionRateCard;