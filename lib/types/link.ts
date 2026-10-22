export interface ShortLink {
  id: string;
  code: string;
  originalUrl: string;
  alias: string | null;
  clickCounts: number;
  createdAt: string;
  expiresAt?: string | null;
  isActive: boolean;
}

export interface CreateLinkRequest {
  longUrl: string;
  alias?: string;
  expiresAt?: string;
}
