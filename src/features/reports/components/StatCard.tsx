interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

const StatCard = ({
  title,
  value,
  change,
  trend,
}: StatCardProps) => {
  const isPositive = trend === "up";

  return (
   <div className="min-w-0 rounded-2xl bg-white p-2 shadow-sm sm:p-6">
  <h2 className="text-xs font-medium text-secondary-gray-500 sm:text-xl">
    {title}
  </h2>

  <p className="mt-3 text-2xl font-bold tracking-tight text-secondary-gray-700 sm:text-5xl">
    {value}
  </p>

  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        
        <span
          className={
            isPositive
              ? "font-medium text-support-success"
              : "font-medium text-support-danger"
          }
        >
          {change}
        </span>

        <span className="text-secondary-gray-400">
          From last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;