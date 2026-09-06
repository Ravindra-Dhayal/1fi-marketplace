"use client";
import type { EMIPlan } from "@/types/marketplace";
import { formatINR } from "@/lib/api";

export default function EMIPlanCard({ plan, selected, onSelect }: { plan: EMIPlan; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
        selected ? "border-brand-primary bg-brand-surface" : "border-brand-border bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-brand-primary" : "border-gray-300"}`}>
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />}
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {plan.tenureMonths} months
            {plan.recommended && (
              <span className="ml-2 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[11px] font-semibold text-brand-primary">Recommended</span>
            )}
          </p>
          <p className="mt-0.5 text-[12px] text-brand-success">
            {plan.noCost ? "No-cost EMI · 0% interest" : `${plan.interestRate}% interest`}
          </p>
        </div>
      </div>
      <p className="whitespace-nowrap text-sm font-bold text-gray-900">{formatINR(plan.monthlyAmount)}/mo</p>
    </button>
  );
}