import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNotify } from "@/components/AlertProvider";
import { api, getErrorMessage } from "@/lib/api";
import { storage } from "@/lib/storage";
import type { User } from "@/types/user";

interface AuthContextValue {
  user: User | null;
  /** Vrai tant que la session enregistrée n'a pas été vérifiée. */
  initializing: boolean;
  login: (pseudo: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  /** Enregistre un jeton reçu (inscription) puis charge l'utilisateur. */
  authenticate: (token: string) => Promise<void>;
  /** Recharge l'utilisateur (points, progression…). */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get<{ user: User }>("/getuser");
  return data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const notify = useNotify();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(() =>
    Boolean(storage.getToken()),
  );

  useEffect(() => {
    if (!storage.getToken()) return;
    fetchCurrentUser()
      .then(setUser)
      .catch((error: unknown) => {
        storage.setToken(null);
        notify({ type: "error", message: getErrorMessage(error) });
      })
      .finally(() => setInitializing(false));
  }, [notify]);

  const refreshUser = useCallback(async () => {
    setUser(await fetchCurrentUser());
  }, []);

  const login = useCallback(async (pseudo: string, password: string) => {
    const { data } = await api.post<{
      user: User;
      token: string;
      message: string;
    }>("/login", { pseudo, password });
    storage.setToken(data.token);
    setUser(data.user);
    return data.message;
  }, []);

  const authenticate = useCallback(
    async (token: string) => {
      storage.setToken(token);
      await refreshUser();
    },
    [refreshUser],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
    } finally {
      storage.setToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, initializing, login, logout, authenticate, refreshUser }),
    [user, initializing, login, logout, authenticate, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}

/** Utilisateur connecté, pour les composants rendus derrière <RequireAuth>. */
// eslint-disable-next-line react-refresh/only-export-components
export function useCurrentUser(): User {
  const { user } = useAuth();
  if (!user) throw new Error("Aucun utilisateur connecté");
  return user;
}
