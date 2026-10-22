"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { CreateLinkRequest, ShortLink } from "@/lib/types/link";

interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateLinkRequest) => Promise<ShortLink>;
}

export function CreateLinkModal({ open, onClose, onCreate }: CreateLinkModalProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onCreate({
        longUrl: originalUrl,
        alias: customAlias.trim() || undefined,
      });
      setOriginalUrl("");
      setCustomAlias("");
      onClose();
    } catch (err) {
      console.error("Failed to create link:", err);
      setError("Couldn't create that link. Check the URL and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#18181B]">New link</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-[#71717A] hover:bg-[#F7F7F6] hover:text-[#18181B]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-[#52525B]" htmlFor="longUrl">
              Destination URL
            </label>
            <input
              type="url"
              name="longUrl"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-[#52525B]" htmlFor="alias">
              Custom alias <span className="text-[#A1A1AA]">(optional)</span>
            </label>
            <div className="flex items-center rounded-lg border border-[#E7E5E4] focus-within:border-[#2563EB]">
              <span className="pl-3 text-sm text-[#A1A1AA]">/</span>
              <input
                type="text"
                name="alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-link"
                className="w-full rounded-lg px-1.5 py-2 text-sm text-[#18181B] outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-[#DC2626]">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#52525B] hover:bg-[#F7F7F6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#2563EB] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}