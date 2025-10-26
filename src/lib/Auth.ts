// src/lib/auth.ts
const SESSION_KEY = "ticketapp_session";

export type SessionPayload = {
  token: string; // token string from mockAuthAPI
  user: {
    id: string;
    email: string;
    name?: string;
  };
  createdAt: number;
};

export function setSession(payload: SessionPayload) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function getSession(): SessionPayload | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as SessionPayload : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
