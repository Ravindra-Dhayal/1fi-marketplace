"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ReceiptText, LineChart, User } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/emi-dues", label: "EMI Dues", icon: ReceiptText },
  { href: "/limit", label: "Limit", icon: LineChart },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-brand-border bg-white">
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link href={href} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium">
                <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} className={isActive ? "text-brand-primary" : "text-gray-400"} />
                <span className={isActive ? "text-brand-primary" : "text-gray-400"}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}