export default function ProductImage({ color, name, className = "" }: { color: string; name: string; className?: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: color === "#e8e8ed" ? color : `${color}15` }}
    >
      <span className="text-3xl font-bold" style={{ color: color === "#e8e8ed" ? "#1d1d1f" : color }}>
        {initials}
      </span>
    </div>
  );
}