"use client";

import { useState } from "react";
import apiClient from "@/lib/api/apiClient";
import { SettingsSection } from "./SettingsSection";

export function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      // NOTE: assumes a POST /api/auth/change-password endpoint — not yet
      // built on the backend. Mirrors the ResetPasswordAsync shape but for
      // an authenticated user changing their own password.
      await apiClient.post("/api/auth/change-password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to change password:", err);
      setError("Couldn't update your password. Check your current password and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SettingsSection title="Password" description="Change the password for your account">
      <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-[#52525B]">
            Current password
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[#52525B]">
            New password
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-[#52525B]">
            Confirm new password
          </label>
          <input
            type="password"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#2563EB]"
          />
        </div>

        {error && <p className="text-sm text-[#DC2626]">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#18181B] px-3.5 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
          {success && <span className="text-sm text-[#16A34A]">Updated</span>}
        </div>
      </form>
    </SettingsSection>
  );
}