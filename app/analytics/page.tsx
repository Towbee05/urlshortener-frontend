"use client";

import { useEffect, useState } from "react";
import { useLinks } from "@/hooks/UseLinks";
import { Sidebar } from "@/components/analytics/Sidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { StatCard } from "@/components/analytics/StatCard";
import { LinksTable } from "@/components/links/LinksTable";
import { SuccessResponse } from "@/lib/types";
import apiClient from "@/lib/api/apiClient";
import axios from "axios";

interface AnalyticsSummary {
  totalClicks: number;
  totalLinks: number;
  averageClicksPerLinks: number;
  topPerforming: string;
}

export default function AnalyticsOverviewPage() {
  const { links, loading: linksLoading, error: linksError, deleteLink } = useLinks();

  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
  const controller = new AbortController();

  async function fetchAnalytics() {
    try {
      const { data } = await apiClient.get<SuccessResponse<AnalyticsSummary>>(
        "/api/v1/urls/analytics",
        { signal: controller.signal }
      );
      console.log(data);
      setSummary(data.data);
    } catch (e) {
      console.error(e);
      if (axios.isCancel(e)) return; // effect cleaned up, ignore

      if (axios.isAxiosError(e)) {
        setSummaryError(
          e.response?.data?.details ?? e.response?.data?.title ?? "Failed to load analytics"
        );
      } else {
        setSummaryError("Something went wrong");
      }
    } finally {
      if (!controller.signal.aborted) {
        setSummaryLoading(false);
      }
    }
  }

  fetchAnalytics();
  return () => controller.abort();
}, []);

  const sortedByClicks = [...links].sort((a, b) => b.clickCounts - a.clickCounts);

  const loading = linksLoading || summaryLoading;
  const error = linksError ?? summaryError;

  return (
    <div className="flex h-screen bg-[#F7F7F6]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopBar
          left={<span className="text-sm font-medium text-[#18181B]">Analytics</span>}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-5xl space-y-5">
            <div>
              <h1 className="text-[22px] font-semibold text-[#18181B]">
                Analytics overview
              </h1>
              <p className="mt-0.5 text-sm text-[#71717A]">
                Across all your links
              </p>
            </div>

            {loading ? (
              <div className="rounded-xl border border-[#E7E5E4] bg-white p-10 text-center text-sm text-[#71717A]">
                Loading your analytics…
              </div>
            ) : error ? (
              <div className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm text-[#DC2626]">
                {error}
              </div>
            ) : links.length === 0 || !summary ? (
              <div className="rounded-xl border border-[#E7E5E4] bg-white p-10 text-center">
                <p className="text-sm text-[#71717A]">
                  Create a link to start seeing analytics here.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-4">
                  <StatCard label="Total clicks" value={summary.totalClicks} />
                  <StatCard label="Total links" value={summary.totalLinks} />
                  <StatCard label="Avg clicks / link" value={Math.round(summary.averageClicksPerLinks)} />
                  <StatCard label="Top performing" value={`/${summary.topPerforming || "—"}`} />
                </div>

                <div>
                  <h2 className="mb-3 text-sm font-medium text-[#18181B]">
                    All links, ranked by clicks
                  </h2>
                  <LinksTable links={sortedByClicks} onDelete={deleteLink} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}