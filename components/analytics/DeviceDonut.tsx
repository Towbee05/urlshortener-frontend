"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { DeviceBreakdown } from "@/lib/types/analytics";

const COLORS = ["#2563EB", "#7C3AED", "#D97706", "#0D9488"];

interface DeviceDonutProps {
  devices: DeviceBreakdown;
}

export function DeviceDonut({ devices }: DeviceDonutProps) {
  const data = Object.entries(devices.byDeviceType).map(([name, value]) => ({
    name,
    value,
  }));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-[#18181B]">Devices</h3>

      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-[#18181B]">
            {total}
          </span>
          <span className="text-xs text-[#71717A]">clicks</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="capitalize text-[#52525B]">{d.name}</span>
            </div>
            <span className="tabular-nums text-[#18181B]">
              {total > 0 ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}