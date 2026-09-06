"use client";

import { Suspense, useState } from "react";
import ShopTabs, { ShopTabId } from "@/components/ShopTabs";
import TopBrandsPanel from "@/components/shop/TopBrandsPanel";
import NearbyStoresPanel from "@/components/shop/NearbyStoresPanel";
import MarketplacePanel from "@/components/shop/MarketplacePanel";
import BottomNav from "@/components/BottomNav";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTabId>("marketplace");

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-gradient-to-br from-brand-primary-dark to-brand-primary px-5 pb-8 pt-6 text-white">
        <p className="text-2xl font-bold leading-snug">
          Pay later using
          <br />
          Mutual funds.
        </p>
        <p className="mt-2 text-sm text-white/80">
          No credit score required. No interest. Backed by your investments.
        </p>
      </div>

      <div className="-mt-4 px-4">
        <div className="rounded-3xl bg-white p-2 shadow-sm">
          <ShopTabs active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="px-4 pt-4">
        {activeTab === "top-brands" && <TopBrandsPanel />}
        {activeTab === "nearby-stores" && <NearbyStoresPanel />}
        {activeTab === "marketplace" && (
          <Suspense fallback={null}>
            <MarketplacePanel />
          </Suspense>
        )}
      </div>

      <BottomNav />
    </div>
  );
}