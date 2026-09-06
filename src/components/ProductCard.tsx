"use client";
import Link from "next/link";
import type { Product } from "@/types/marketplace";
import { formatINR } from "@/lib/api";
import ProductImage from "@/components/ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const cheapest = product.variants.reduce((c, v) => (v.price < c.price ? v : c));
  const minMonthly = Math.round(cheapest.price / 12);

  return (
    <Link href={`/shop/marketplace/${product.id}`} className="group rounded-2xl border border-brand-border p-3 transition-shadow active:shadow-sm">
      <ProductImage color={product.color} name={product.name} className="mb-3 aspect-square rounded-xl" />
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{product.brand}</p>
      <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</p>
      <p className="mt-1 text-sm font-bold text-gray-900">{formatINR(cheapest.price)}</p>
      <p className="mt-0.5 text-[12px] font-medium text-brand-primary">or {formatINR(minMonthly)}/mo · No cost EMI</p>
    </Link>
  );
}