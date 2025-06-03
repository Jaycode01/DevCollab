"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User, signOut } from "firebase/auth";
import { auth } from "./config";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  logout: async () => {},
  refreshToken: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, settoken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const freshToken = await user.getIdToken(true);
        localStorage.setItem("token", freshToken);
      } else {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      settoken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const refreshToken = async () => {
    if (user) {
      try {
        const freshToken = await user.getIdToken(true);
        localStorage.setItem("token", freshToken);
        return freshToken;
      } catch (error) {
        console.error("Error refreshing token: ", error);
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refreshToken, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
