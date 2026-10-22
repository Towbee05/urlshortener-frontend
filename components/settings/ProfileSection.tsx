"use client";

import { useState, useEffect } from "react";
import { SettingsSection } from "./SettingsSection";
import type { UserProfile, UpdateProfileRequest } from "@/lib/types/user";

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate: (payload: UpdateProfileRequest) => Promise<UserProfile>;
}

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [username, setUsername] = useState(profile.username);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsername(profile.username);
  }, [profile.username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onUpdate({ username });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("That username might already be taken.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsSection title="Profile" description="Your public username and account email">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-[#52525B]">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#2563EB]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-[#52525B]">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full max-w-sm rounded-lg border border-[#E7E5E4] bg-[#F7F7F6] px-3 py-2 text-sm text-[#A1A1AA]"
          />
          <p className="mt-1 text-xs text-[#A1A1AA]">
            Email is tied to your {profile.authProvider} sign-in and can&apos;t be changed here.
          </p>
        </div>

        {error && <p className="text-sm text-[#DC2626]">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || username === profile.username}
            className="rounded-lg bg-[#2563EB] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && <span className="text-sm text-[#16A34A]">Saved</span>}
        </div>
      </form>
    </SettingsSection>
  );
}