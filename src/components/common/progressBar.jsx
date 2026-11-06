function ProgressBar({ current = 0, total = 100, value, color = "bg-amber-500", trackColor = "bg-amber-100" }) {
  // If 'value' is passed directly, use it. Otherwise calculate from current/total.
  const percentage = value !== undefined ? value : (current / total) * 100;
  const displayText = value !== undefined ? `${value}%` : `${current}/${total}`;

  return (
    <div className="w-full">
      {/* Optional: Only show numbers if you want */}
      <div className="flex justify-end text-xs text-gray-400 mb-1 font-medium">
        <span>{displayText}</span>
      </div>
      <div className={`w-full h-2 rounded-full overflow-hidden ${trackColor}`}>
        <div 
          className={`h-full rounded-full transition-all duration-300 ${color}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;