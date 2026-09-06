"use client";
import type { ProductVariant } from "@/types/marketplace";

export default function VariantSelector({ variants, selectedId, onSelect }: { variants: ProductVariant[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedId;
        return (
          <button
            key={variant.id}
            disabled={!variant.inStock}
            onClick={() => onSelect(variant.id)}
            className={`rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-colors ${
              !variant.inStock
                ? "cursor-not-allowed border-brand-border text-gray-300 line-through"
                : isSelected
                  ? "border-brand-primary bg-brand-surface text-brand-primary"
                  : "border-brand-border text-gray-700"
            }`}
          >
            {variant.label}
            {!variant.inStock && " · Out of stock"}
          </button>
        );
      })}
    </div>
  );
}