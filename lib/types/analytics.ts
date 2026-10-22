export interface LinkMetadata {
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

export interface OverviewStats {
  totalClicks: number;
  uniqueVisitors: number;
  clicksLast24h: number;
  clicksLast7d: number;
}

export interface ClicksOverTimePoint {
  bucket: string; // ISO date
  count: number;
}

export interface ReferrerCount {
  referrer: string;
  count: number;
}

export interface GeoCount {
  country: string;
  city: string | null;
  count: number;
}

export interface DeviceBreakdown {
  byDeviceType: Record<string, number>;
  byBrowser: Record<string, number>;
  byOs: Record<string, number>;
}

export interface RecentClick {
  timestamp: string;
  referrer: string | null;
  country: string | null;
  deviceType: string | null;
  browser: string | null;
}

export interface AnalyticsSnapshot {
  link: LinkMetadata;
  overview: OverviewStats;
  clicksOverTime: ClicksOverTimePoint[];
  referrers: ReferrerCount[];
  geography: GeoCount[];
  devices: DeviceBreakdown;
  recentClicks: RecentClick[];
}

export interface ClickUpdate {
  shortCode: string;
  click: RecentClick;
  updatedOverview: OverviewStats;
}