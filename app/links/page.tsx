"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useLinks } from "@/hooks/UseLinks";
import { Sidebar } from "@/components/analytics/Sidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { LinksTable } from "@/components/links/LinksTable";
import { CreateLinkModal } from "@/components/links/CreateLinkModal";

export default function LinksPage() {
  const { links, loading, error, createLink, deleteLink } = useLinks();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F7F7F6]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar left={<span className="text-sm font-medium text-[#18181B]">Links</span>} />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-5xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-semibold text-[#18181B]">
                  Your links
                </h1>
                <p className="mt-0.5 text-sm text-[#71717A]">
                  {links.length} link{links.length === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
              >
                <Plus className="h-4 w-4" />
                New link
              </button>
            </div>

            {loading ? (
              <div className="rounded-xl border border-[#E7E5E4] bg-white p-10 text-center text-sm text-[#71717A]">
                Loading your links…
              </div>
            ) : error ? (
              <div className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
                {error}
              </div>
            ) : (
              <LinksTable links={links} onDelete={deleteLink} />
            )}
          </div>
        </main>
      </div>

      <CreateLinkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createLink}
      />
    </div>
  );
}