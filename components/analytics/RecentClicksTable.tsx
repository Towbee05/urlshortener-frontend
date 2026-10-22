import type { RecentClick } from "@/lib/types/analytics";

interface RecentClicksTableProps {
  clicks: RecentClick[];
}

export function RecentClicksTable({ clicks }: RecentClicksTableProps) {
  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-[#18181B]">Recent clicks</h3>

      {clicks.length === 0 ? (
        <p className="text-sm text-[#A1A1AA]">No clicks recorded yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E7E5E4] text-[#71717A]">
                <th className="pb-2 font-medium">Time</th>
                <th className="pb-2 font-medium">Referrer</th>
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium">Device</th>
                <th className="pb-2 font-medium">Browser</th>
              </tr>
            </thead>
            <tbody>
              {clicks.slice(0, 20).map((click, i) => (
                <tr
                  key={`${click.timestamp}-${i}`}
                  className="border-b border-[#F1F1EF] last:border-0"
                >
                  <td className="py-2.5 text-[#52525B]">
                    {new Date(click.timestamp).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2.5 text-[#52525B]">
                    {click.referrer || "Direct"}
                  </td>
                  <td className="py-2.5 text-[#52525B]">
                    {click.country || "Unknown"}
                  </td>
                  <td className="py-2.5 capitalize text-[#52525B]">
                    {click.deviceType || "—"}
                  </td>
                  <td className="py-2.5 text-[#52525B]">{click.browser || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}