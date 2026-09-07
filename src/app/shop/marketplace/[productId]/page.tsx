"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import type { EMIPlan, Product } from "@/types/marketplace";
import { getProductById, getEMIPlans, formatINR } from "@/lib/api";
import ProductImage from "@/components/ProductImage";
import VariantSelector from "@/components/VariantSelector";
import EMIPlanCard from "@/components/EMIPlanCard";
import { EMIPlanSkeleton, ErrorState } from "@/components/StatusStates";

type ProductStatus = "loading" | "error" | "success" | "not-found";
type PlansStatus = "loading" | "error" | "success";

export default function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const simulateError = searchParams.get("simulateError") === "1";

  const [productStatus, setProductStatus] = useState<ProductStatus>("loading");
  const [product, setProduct] = useState<Product | null>(null);
  const [variantId, setVariantId] = useState<string>("");
  const [productReloadKey, setProductReloadKey] = useState(0);

  const [plansStatus, setPlansStatus] = useState<PlansStatus>("loading");
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [planId, setPlanId] = useState<string>("");
  const [plansReloadKey, setPlansReloadKey] = useState(0);

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount/dep-change pattern (react.dev/learn/you-might-not-need-an-effect#fetching-data)
    setProductStatus("loading");
    getProductById(productId, { simulateError })
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setProductStatus("not-found");
          return;
        }
        setProduct(data);
        const firstInStock = data.variants.find((v) => v.inStock) ?? data.variants[0];
        setVariantId(firstInStock.id);
        setProductStatus("success");
      })
      .catch(() => {
        if (!cancelled) setProductStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [productId, simulateError, productReloadKey]);

  useEffect(() => {
    if (!variantId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount/dep-change pattern (react.dev/learn/you-might-not-need-an-effect#fetching-data)
    setPlansStatus("loading");
    getEMIPlans(productId, variantId, { simulateError })
      .then((data) => {
        if (cancelled) return;
        setPlans(data);
        setPlanId(data.find((p) => p.recommended)?.id ?? data[0]?.id ?? "");
        setPlansStatus("success");
      })
      .catch(() => {
        if (!cancelled) setPlansStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [productId, variantId, simulateError, plansReloadKey]);

  if (productStatus === "loading") {
    return (
      <div className="p-4">
        <div className="mb-4 aspect-square animate-pulse rounded-2xl bg-brand-surface" />
        <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-brand-surface" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-brand-surface" />
      </div>
    );
  }

  if (productStatus === "not-found") {
    return (
      <div className="p-4">
        <ErrorState title="Product not found" message="This product may have been removed." onRetry={() => router.push("/shop")} />
      </div>
    );
  }

  if (productStatus === "error" || !product) {
    return (
      <div className="p-4">
        <ErrorState message="Could not load this product. Please try again." onRetry={() => setProductReloadKey((k) => k + 1)} />
      </div>
    );
  }

  const selectedVariant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const selectedPlan = plans.find((p) => p.id === planId);

  return (
    <div className="min-h-screen bg-white pb-32">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-brand-border bg-white/95 px-4 py-3 backdrop-blur">
        <Link href="/shop" aria-label="Back to Shop" className="p-1">
          <ChevronLeft size={22} />
        </Link>
        <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
      </header>

      <div className="px-4 pt-4">
        <ProductImage src={product.image} category={product.category} name={product.name} className="mb-5 aspect-square rounded-2xl" />

        <p className="text-[12px] font-medium uppercase tracking-wide text-gray-400">{product.brand}</p>
        <h1 className="mt-0.5 text-lg font-bold text-gray-900">{product.name}</h1>

        {product.rating && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 rounded bg-brand-success/10 px-1.5 py-0.5 text-[12px] font-semibold text-brand-success">
              {product.rating} <Star size={11} fill="currentColor" />
            </span>
            <span className="text-[12px] text-gray-400">{product.reviewCount?.toLocaleString("en-IN")} ratings</span>
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-xl font-bold text-gray-900">{formatINR(selectedVariant.price)}</p>
          {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
            <p className="text-sm text-gray-400 line-through">{formatINR(selectedVariant.mrp)}</p>
          )}
        </div>

        {product.variants.length > 1 && (
            <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-gray-900">Select variant</p>
                <VariantSelector
                    variants={product.variants}
                    selectedId={variantId}
                    onSelect={(id) => {
                        setVariantId(id);
                        setConfirmed(false);
                    }}
                />
            </div>
        )}

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-gray-900">Highlights</p>
          <ul className="space-y-1.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-900">About this item</p>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{product.description}</p>
        </div>

        <div className="mt-7">
          <p className="mb-2 text-sm font-semibold text-gray-900">Choose your EMI plan</p>
          {plansStatus === "loading" && <EMIPlanSkeleton />}
          {plansStatus === "error" && (
            <ErrorState message="Could not load EMI plans for this variant." onRetry={() => setPlansReloadKey((k) => k + 1)} />
          )}
          {plansStatus === "success" && (
            <div className="space-y-2.5">
              {plans.map((plan) => (
                <EMIPlanCard key={plan.id} plan={plan} selected={plan.id === planId} onSelect={() => {setPlanId(plan.id); setConfirmed(false);}} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-brand-border bg-white px-4 py-3">
        {confirmed ? (
          <div className="rounded-xl bg-brand-success/10 px-4 py-3 text-center text-sm font-semibold text-brand-success">
            Plan confirmed — {selectedPlan?.tenureMonths} months at {selectedPlan && formatINR(selectedPlan.monthlyAmount)}/mo
          </div>
        ) : (
          <button
            disabled={plansStatus !== "success" || !selectedPlan}
            onClick={() => setConfirmed(true)}
            className="w-full rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {selectedPlan ? `Proceed with ${selectedPlan.tenureMonths}-month plan` : "Select an EMI plan"}
          </button>
        )}
      </div>
    </div>
  );
}