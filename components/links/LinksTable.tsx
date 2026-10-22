"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Trash2, BarChart3 } from "lucide-react";
import type { ShortLink } from "@/lib/types/link";

const backendLocation = process.env.NEXT_PUBLIC_API_URL;

interface LinksTableProps {
  links: ShortLink[];
  onDelete: (id: string) => Promise<void>;
}

export function LinksTable({ links, onDelete }: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (link: ShortLink) => {
    // const shortUrl = `${window.location.origin}/${link.code}`;
    const actualShortenedUrl = `${backendLocation}/${link.code}`;
    await navigator.clipboard.writeText(actualShortenedUrl);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (links.length === 0) {
    return (
      <div className="rounded-xl border border-[#E7E5E4] bg-white p-10 text-center">
        <p className="text-sm text-[#71717A]">
          You haven&apos;t created any links yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E7E5E4] bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#E7E5E4] text-[#71717A]">
            <th className="px-5 py-3 font-medium">Short link</th>
            <th className="px-5 py-3 font-medium">Destination</th>
            <th className="px-5 py-3 font-medium">Clicks</th>
            <th className="px-5 py-3 font-medium">Created</th>
            <th className="px-5 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr
              key={link.id}
              className="border-b border-[#F1F1EF] last:border-0 hover:bg-[#FAFAF9]"
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#2563EB]">
                    /{link.code}
                  </span>
                  {!link.isActive && (
                    <span className="rounded-full bg-[#F1F1EF] px-1.5 py-0.5 text-[11px] text-[#71717A]">
                      Inactive
                    </span>
                  )}
                </div>
              </td>
              <td className="max-w-xs truncate px-5 py-3 text-[#52525B]">
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                  {link.originalUrl}
                </a>
              </td>
              <td className="px-5 py-3 tabular-nums text-[#18181B]">
                {link.clickCounts.toString()}
              </td>
              <td className="px-5 py-3 text-[#71717A]">
                {new Date(link.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(link)}
                    aria-label="Copy short link"
                    className="rounded-md p-1.5 text-[#71717A] hover:bg-[#F1F1EF] hover:text-[#18181B]"
                  >
                    {copiedId === link.id ? (
                      <Check className="h-4 w-4 text-[#16A34A]" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    href={`/analytics/${link.code}`}
                    aria-label="View analytics"
                    className="rounded-md p-1.5 text-[#71717A] hover:bg-[#F1F1EF] hover:text-[#18181B]"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Link>
                  <button
                    type="button" 
                    onClick={() => onDelete(link.id)}
                    aria-label="Delete link"
                    className="rounded-md p-1.5 text-[#71717A] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}