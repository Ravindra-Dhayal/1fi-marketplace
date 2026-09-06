"use client";

export type ShopTabId = "top-brands" | "nearby-stores" | "marketplace";
const TABS: { id: ShopTabId; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export default function ShopTabs({ active, onChange }: { active: ShopTabId; onChange: (t: ShopTabId) => void }) {
  return (
    <div role="tablist" aria-label="Shop sections" className="flex items-center gap-1 rounded-full bg-brand-surface p-1">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex-1 whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] font-semibold transition-colors ${
              isActive ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}