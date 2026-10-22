"use client";

import { useProfile } from "@/hooks/UseProfile";
import { Sidebar } from "@/components/analytics/Sidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { PasswordSection } from "@/components/settings/PasswordSection";
import { ConnectedAccountsSection } from "@/components/settings/ConnectedAccountsSection";
import { DangerZoneSection } from "@/components/settings/DangerZoneSection";

export default function SettingsPage() {
  const { profile, loading, error, updateProfile } = useProfile();

  return (
    <div className="flex h-screen bg-[#F7F7F6]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar
          left={<span className="text-sm font-medium text-[#18181B]">Settings</span>}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-2xl space-y-5">
            <h1 className="text-[22px] font-semibold text-[#18181B]">Settings</h1>

            {loading ? (
              <div className="rounded-xl border border-[#E7E5E4] bg-white p-10 text-center text-sm text-[#71717A]">
                Loading your settings…
              </div>
            ) : error || !profile ? (
              <div className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
                {error ?? "Unable to load your profile."}
              </div>
            ) : (
              <>
                <ProfileSection profile={profile} onUpdate={updateProfile} />
                {profile.authProvider === "local" && <PasswordSection />}
                <ConnectedAccountsSection profile={profile} />
                <DangerZoneSection />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}