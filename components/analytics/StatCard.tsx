interface StatCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; direction: "up" | "down" };
}

export function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <p className="text-sm text-[#71717A]">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[32px] font-semibold leading-none tabular-nums text-[#18181B]">
          {value}
        </span>
        {delta && (
          <span
            className={`text-xs font-medium ${
              delta.direction === "up" ? "text-[#16A34A]" : "text-[#DC2626]"
            }`}
          >
            {delta.direction === "up" ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}