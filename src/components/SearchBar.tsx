"use client";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full bg-brand-surface px-4 py-3">
      <Search size={18} className="text-gray-400" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
    </div>
  );
}