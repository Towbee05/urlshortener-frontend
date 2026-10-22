"use client";

// import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { ClicksOverTimePoint } from "@/lib/types/analytics";

const ranges = ["24h", "7d", "30d"] as const;
type Range = (typeof ranges)[number];

interface ClicksOverTimeChartProps {
  points: ClicksOverTimePoint[];
  range: Range;
  onRangeChange: (range: Range) => void;
}

export function ClicksOverTimeChart({
  points,
  range,
  onRangeChange,
}: ClicksOverTimeChartProps) {
  const data = points.map((p) => ({
    label: new Date(p.bucket).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      ...(range === "24h" ? { hour: "numeric" } : {}),
    }),
    count: p.count,
  }));

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#18181B]">Clicks over time</h3>
        <div className="flex rounded-lg border border-[#E7E5E4] p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                range === r
                  ? "bg-[#EFF4FF] text-[#2563EB]"
                  : "text-[#71717A] hover:text-[#18181B]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#E7E5E4" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#A1A1AA" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#A1A1AA" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E7E5E4",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}