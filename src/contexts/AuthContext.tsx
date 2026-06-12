import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface AuthUser {
  battletag: string;
  avatar:    string | null;
  playerId:  string | null;
}

interface AuthCtx {
  user:    AuthUser | null;
  loading: boolean;
  login:   () => void;
  logout:  () => void;
  refresh: () => void;
}

const Ctx = createContext<AuthCtx>({
  user: null, loading: true,
  login: () => {}, logout: () => {}, refresh: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const { data } = await axios.get('/api/auth/me', { withCredentials: true });
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const login  = () => { window.location.href = '/api/auth/bnet'; };
  const logout = () => { window.location.href = '/api/auth/logout'; };

  return <Ctx.Provider value={{ user, loading, login, logout, refresh }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
