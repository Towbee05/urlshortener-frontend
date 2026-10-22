"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart3, Settings } from "lucide-react";

const navItems = [
  { href: "/links", label: "Links", icon: Link2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3, matchPrefix: true },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-[#E7E5E4] bg-white px-3 py-5">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB]">
          <Link2 className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold text-[#18181B]">Shortly</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, matchPrefix }) => {
          const active = matchPrefix
            ? pathname?.startsWith(href)
            : pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[#EFF4FF] text-[#2563EB] font-medium"
                  : "text-[#52525B] hover:bg-[#F7F7F6] hover:text-[#18181B]"
              }`}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}