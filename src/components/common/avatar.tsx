type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
};

function Avatar({ name, src, size = 28, className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      style={{ width: size, height: size }}
      className={`rounded-full object-cover ${className}`}
    />
  ) : (
    <span
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600 ${className}`}
    >
      {initials}
    </span>
  );
}

export default Avatar;