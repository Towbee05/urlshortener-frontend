interface RankedListItem {
  label: string;
  count: number;
}

interface RankedListProps {
  title: string;
  items: RankedListItem[];
  emptyLabel?: string;
}

export function RankedList({ title, items, emptyLabel = "No data yet" }: RankedListProps) {
  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-[#18181B]">{title}</h3>

      {items.length === 0 ? (
        <p className="text-sm text-[#A1A1AA]">{emptyLabel}</p>
      ) : (
        <div className="space-y-3">
          {items.slice(0, 6).map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="truncate text-[#52525B]">{item.label}</span>
                <span className="tabular-nums text-[#18181B]">{item.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#F1F1EF]">
                <div
                  className="h-1.5 rounded-full bg-[#2563EB]"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}