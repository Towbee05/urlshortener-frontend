"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import apiClient from "@/lib/api/apiClient";
import { SettingsSection } from "./SettingsSection";

export function DangerZoneSection() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Clears the backend's refresh_token cookie and revokes it server-side
      await apiClient.post("/api/auth/logout");
    } catch (err) {
      // Even if this fails (e.g. token already expired), still proceed to
      // clear the NextAuth session and redirect — a failed revoke shouldn't
      // trap the user on the settings page.
      console.error("Backend logout failed:", err);
    } finally {
      // Clears the NextAuth session cookie and redirects
      await signOut({ callbackUrl: "/auth/login" });
    }
  };

  return (
    <SettingsSection title="Account">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#18181B]">Log out</p>
          <p className="text-sm text-[#71717A]">
            End your session on this device
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-[#E7E5E4] px-3.5 py-2 text-sm font-medium text-[#18181B] hover:bg-[#F7F7F6] disabled:opacity-50"
        >
          {loggingOut ? "Logging out…" : "Log out"}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#F1F1EF] pt-4">
        <div>
          <p className="text-sm text-[#DC2626]">Delete account</p>
          <p className="text-sm text-[#71717A]">
            Permanently delete your account and all your links
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Not available yet"
          className="rounded-lg border border-[#FCA5A5] px-3.5 py-2 text-sm font-medium text-[#DC2626] opacity-50"
        >
          Delete account
        </button>
      </div>
    </SettingsSection>
  );
}