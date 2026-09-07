"use client";

export type ShopTabId = "top-brands" | "nearby-stores" | "marketplace";

const TABS: { id: ShopTabId; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export default function ShopTabs({
  active,
  onChange,
}: {
  active: ShopTabId;
  onChange: (tab: ShopTabId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Shop sections"
      className="flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex-1 whitespace-nowrap rounded-full px-2 py-2.5 text-[11px] font-semibold transition-colors sm:px-3 sm:text-[13px] ${
              isActive
                ? "bg-white text-brand-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex flex-col items-center gap-1">
              {tab.label}
              <span
                className={`h-0.5 w-6 rounded-full transition-colors ${
                  isActive ? "bg-brand-primary" : "bg-transparent"
                }`}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}