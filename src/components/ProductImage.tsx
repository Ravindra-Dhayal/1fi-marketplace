import Image from "next/image";
import { Smartphone, Laptop, Headphones, Package } from "lucide-react";

const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  Smartphones: Smartphone,
  Laptops: Laptop,
  Audio: Headphones,
};

export default function ProductImage({
  src,
  category,
  name,
  className = "",
}: {
  src?: string;
  category: string;
  name: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-brand-surface ${className}`}>
        <Image src={src} alt={name} fill sizes="(max-width: 640px) 50vw, 300px" className="object-cover" />
      </div>
    );
  }
  const Icon = CATEGORY_ICONS[category] ?? Package;
  return (
    <div className={`flex items-center justify-center bg-brand-surface ${className}`}>
      <Icon size={48} strokeWidth={1.5} className="text-gray-400" />
    </div>
  );
}