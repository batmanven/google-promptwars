"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { subscribeToAuth, loginAnonymous } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    
    // We might need to wait for Firebase to initialize if it hasn't yet
    const initAuth = () => {
      unsubscribe = subscribeToAuth((u) => {
        if (!u) {
          loginAnonymous().then(anon => {
            setUser(anon);
            setLoading(false);
          });
        } else {
          setUser(u);
          setLoading(false);
        }
      });
    };

    initAuth();

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
