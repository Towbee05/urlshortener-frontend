"use client";

import { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Sidebar } from "@/components/analytics/Sidebar";
import { TopBar } from "@/components/analytics/Topbar";
import { StatCard } from "@/components/analytics/StatCard";
import { ClicksOverTimeChart } from "@/components/analytics/ClickOverTimeChart";
import { DeviceDonut } from "@/components/analytics/DeviceDonut";
import { RankedList } from "@/components/analytics/RankedList";
import { RecentClicksTable } from "@/components/analytics/RecentClicksTable";

export default function AnalyticsPage({
  params,
}: {
  params: { shortCode: string };
}) {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("7d");
  const data = useAnalytics(params.shortCode);

  return (
    <div className="flex h-screen bg-[#F7F7F6]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar shortCode={params.shortCode} isLive={!!data} />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {!data ? (
            <div className="flex h-full items-center justify-center text-sm text-[#71717A]">
              Loading analytics…
            </div>
          ) : (
            <div className="mx-auto max-w-6xl space-y-5">
              <div>
                <h1 className="text-[22px] font-semibold text-[#18181B]">
                  Link analytics
                </h1>
                <p className="mt-0.5 truncate text-sm text-[#71717A]">
                  {data.link.originalUrl}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <StatCard label="Total clicks" value={data.overview.totalClicks} />
                <StatCard
                  label="Unique visitors"
                  value={data.overview.uniqueVisitors}
                />
                <StatCard label="Last 24h" value={data.overview.clicksLast24h} />
                <StatCard label="Last 7d" value={data.overview.clicksLast7d} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <ClicksOverTimeChart
                    points={data.clicksOverTime}
                    range={range}
                    onRangeChange={setRange}
                  />
                </div>
                <DeviceDonut devices={data.devices} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <RankedList
                  title="Referrers"
                  items={data.referrers.map((r) => ({
                    label: r.referrer || "Direct",
                    count: r.count,
                  }))}
                />
                <RankedList
                  title="Geography"
                  items={data.geography.map((g) => ({
                    label: g.city ? `${g.city}, ${g.country}` : g.country,
                    count: g.count,
                  }))}
                />
              </div>

              <RecentClicksTable clicks={data.recentClicks} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}