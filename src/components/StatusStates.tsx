"use client";
import { AlertTriangle, PackageSearch } from "lucide-react";

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-brand-border p-3">
          <div className="mb-3 aspect-square rounded-xl bg-brand-surface" />
          <div className="mb-2 h-3 w-3/4 rounded bg-brand-surface" />
          <div className="h-3 w-1/2 rounded bg-brand-surface" />
        </div>
      ))}
    </div>
  );
}

export function EMIPlanSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading EMI plans">
      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-brand-surface" />)}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: { title?: string; message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-border px-6 py-12 text-center">
      <AlertTriangle size={28} className="text-brand-primary" />
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{message}</p>
      <button onClick={onRetry} className="mt-2 rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white active:bg-brand-primary-dark">Try again</button>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message }: { title?: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brand-border px-6 py-12 text-center">
      <PackageSearch size={28} className="text-gray-300" />
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}