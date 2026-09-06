"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/marketplace";
import { getProducts } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { ProductListSkeleton, ErrorState, EmptyState } from "@/components/StatusStates";

type Status = "loading" | "error" | "success";

export default function MarketplacePanel() {
  const searchParams = useSearchParams();
  const simulateError = searchParams.get("simulateError") === "1";

  const [status, setStatus] = useState<Status>("loading");
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getProducts({ simulateError })
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [simulateError, reloadKey]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <SearchBar value={query} onChange={setQuery} />
        <ProductListSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorState
        message="We couldn't load the marketplace. Please check your connection and try again."
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <SearchBar value={query} onChange={setQuery} />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
              category === c ? "border-brand-primary bg-brand-primary text-white" : "border-brand-border text-gray-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No products found" message="Try a different search term or category." />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}