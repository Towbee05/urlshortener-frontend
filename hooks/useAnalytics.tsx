"use client";

import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import apiClient from "@/lib/api/apiClient";
import type { AnalyticsSnapshot, ClickUpdate } from "@/lib/types/analytics";

export function useAnalytics(shortCode: string) {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    let cancelled = false;

    // 1. Initial snapshot via REST
    apiClient
      .get<{ data: AnalyticsSnapshot }>(`/api/${shortCode}/analytics`)
      .then(({ data }) => {
        if (!cancelled) setData(data.data);
      })
      .catch((err) => {
        console.error("Failed to load analytics snapshot:", err);
      });

    // 2. Live updates via SignalR
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/analytics`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ClickReceived", (update: ClickUpdate) => {
      if (update.shortCode !== shortCode) return;
      setData((prev) =>
        prev
          ? {
              ...prev,
              overview: update.updatedOverview,
              recentClicks: [update.click, ...prev.recentClicks].slice(0, 50),
            }
          : prev
      );
    });

    connection
      .start()
      .then(() => connection.invoke("SubscribeToLink", shortCode))
      .catch((err) => console.error("SignalR connection failed:", err));

    connectionRef.current = connection;

    return () => {
      cancelled = true;
      connection
        .invoke("UnsubscribeFromLink", shortCode)
        .catch(() => {
          /* connection may already be closed — safe to ignore */
        })
        .finally(() => connection.stop());
    };
  }, [shortCode]);

  // Derive staleness instead of imperatively resetting state in the effect:
  // if the snapshot we're holding belongs to a different link than the one
  // currently requested, treat it as not-yet-loaded rather than flashing it.
  return data?.link.shortCode === shortCode ? data : null;
}