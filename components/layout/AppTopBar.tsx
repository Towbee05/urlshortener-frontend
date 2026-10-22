"use client";

import { Settings, Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";

interface AppTopBarProps {
  left: ReactNode;
}

export function AppTopBar({ left }: AppTopBarProps) {
  const { data: session } = useSession();
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header className="flex items-center justify-between border-b border-[#E7E5E4] bg-white px-6 py-3">
      <div className="flex items-center gap-2.5">{left}</div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Settings"
          className="rounded-full p-2 text-[#71717A] transition-colors hover:bg-[#F7F7F6] hover:text-[#18181B]"
        >
          <Settings className="h-4.5 w-4.5" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 text-[#71717A] transition-colors hover:bg-[#F7F7F6] hover:text-[#18181B]"
        >
          <Bell className="h-4.5 w-4.5" strokeWidth={2} />
        </button>
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-xs font-medium text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}