/**
 * Module-level admin auth token storage.
 * Used by http.ts to attach Bearer token to admin API requests.
 * Persisted in localStorage so refresh can restore session.
 */

const ACCESS_KEY = "admin_access_token";
const REFRESH_KEY = "admin_refresh_token";

let accessToken: string | null = null;
let refreshToken: string | null = null;

function readFromStorage(): void {
  try {
    accessToken = localStorage.getItem(ACCESS_KEY);
    refreshToken = localStorage.getItem(REFRESH_KEY);
  } catch {
    accessToken = null;
    refreshToken = null;
  }
}

readFromStorage();

export function getAdminAccessToken(): string | null {
  return accessToken;
}

export function getAdminRefreshToken(): string | null {
  return refreshToken;
}

export function setAdminTokens(access: string, refresh: string): void {
  accessToken = access;
  refreshToken = refresh;
  try {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  } catch {
    // ignore
  }
}

export function clearAdminTokens(): void {
  accessToken = null;
  refreshToken = null;
  try {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    // ignore
  }
}

export function hasAdminTokens(): boolean {
  return Boolean(accessToken);
}
