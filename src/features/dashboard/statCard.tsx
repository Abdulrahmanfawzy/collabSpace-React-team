
import ProgressBar from "../../features/dashboard/progressBar";
import type { ReactNode } from "react";

interface StatCardTheme {
  badgeBg: string;
  iconColor: string;
  barColor: string;
  trackColor: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  current: number;
  total: number;
  theme: StatCardTheme;
  iconSvg: ReactNode;
}

function StatCard({
  title,
  value,
  change,
  current,
  total,
  theme,
  iconSvg,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full">

      <div className="flex items-center gap-4 mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${theme.badgeBg} ${theme.iconColor}`}>
          {iconSvg}
        </div>

        <h3 className="text-gray-900 font-semibold text-lg">
          {title}
        </h3>
      </div>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {value}
        </span>

        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <span className="text-sm">↗</span>
          <span>{change}</span>
        </div>
      </div>

      <ProgressBar
        current={current}
        total={total}
        color={theme.barColor}
        trackColor={theme.trackColor}
      />

    </div>
  );
}

export default StatCard;
