
interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard = ({
  title,
  value,
  description,
}: StatCardProps) => {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-2 shadow-sm sm:p-6">
      <h2 className="text-xs font-medium text-secondary-gray-500 sm:text-xl">
        {title}
      </h2>

      <p className="mt-3 text-2xl font-bold tracking-tight text-secondary-gray-700 sm:text-5xl">
        {value}
      </p>

      <p className="mt-4 text-xs text-secondary-gray-400 sm:text-sm">
        {description}
      </p>
    </div>
  );
};

export default StatCard;
