"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ReceiptText, LineChart, User } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home, enabled: false },
  { href: "/shop", label: "Shop", icon: Store, enabled: true },
  { href: "/shop", label: "EMI Dues", icon: ReceiptText, enabled: false },
  { href: "/shop", label: "Limit", icon: LineChart, enabled: false },
  { href: "/shop", label: "Profile", icon: User, enabled: false },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-brand-border bg-white">
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {TABS.map(({ href, label, icon: Icon, enabled }, i) => {
          const isActive = enabled && pathname.startsWith(href) && href !== "/shop" ? false : label === "Shop" && pathname.startsWith("/shop");
          return (
            <li key={label + i} className="flex-1">
              {enabled ? (
                <Link href={href} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium">
                  <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} className={isActive ? "text-brand-primary" : "text-gray-400"} />
                  <span className={isActive ? "text-brand-primary" : "text-gray-400"}>{label}</span>
                </Link>
              ) : (
                <button
                  disabled
                  title="Not part of this assignment's scope"
                  className="flex w-full cursor-not-allowed flex-col items-center gap-1 py-2.5 text-[11px] font-medium opacity-40"
                >
                  <Icon size={22} strokeWidth={1.8} className="text-gray-400" />
                  <span className="text-gray-400">{label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}