"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import ShopTabs, { ShopTabId } from "@/components/ShopTabs";
import TopBrandsPanel from "@/components/shop/TopBrandsPanel";
import NearbyStoresPanel from "@/components/shop/NearbyStoresPanel";
import MarketplacePanel from "@/components/shop/MarketplacePanel";
import BottomNav from "@/components/BottomNav";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTabId>("marketplace");

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-24">
        <section className="-mx-4 -mt-4 overflow-hidden">
            <div className="relative aspect-[3/2] w-full">
                <Image
                    src="/shop_image.jpg"
                    alt="Shop today, Pay later using Mutual funds"
                    fill
                    sizes="100vw"
                    className="scale-110 translate-x-4 object-cover"
                    priority
                />
            </div>
        </section>

        <div className="relative z-[2] -mt-7 px-4">
            <ShopTabs active={activeTab} onChange={setActiveTab} />
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