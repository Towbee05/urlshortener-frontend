export const ACCESS_TOKEN_KEY = "accessToken";
export const AUTH_PATHS = ["/auth/login", "/auth/signup", "/auth/verify-email"];

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export function setAccessToken(token: string): void {
    return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export function clearAccessToken(): void {
    return localStorage.removeItem(ACCESS_TOKEN_KEY);
};
export function isAuthPath(pathname: string): boolean {
    return AUTH_PATHS.includes(pathname);
};
export function sanitizeReturnTo(value: string | null): string | null {
    if (!value) return null;                       // no param → caller falls back to "/"
    if (!value.startsWith("/")) return null;        // rejects "https://evil.com", "javascript:…"
    if (value.startsWith("//")) return null;       // protocol-relative → different origin
    if (value.startsWith("/\\")) return null;       // browsers treat "/\evil.com" as protocol-relative
    return value;
};

export function buildLoginUrl(opts: { reason?: string; returnTo?: string | null }): string {
    const params = new URLSearchParams();
    if (opts.reason) params.set("reason", opts.reason);
    const returnTo = sanitizeReturnTo(opts.returnTo);
    if (returnTo) params.set("returnTo", returnTo);
    const query = params.toString();
    return query ? `/auth/login?${query}` : "/auth/login";

};