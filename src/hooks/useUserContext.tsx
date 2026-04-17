"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { getUserPersona, saveUserPersona, getRecentMissions, saveMissionRecord } from "@/services/firestoreService";

interface UserContextType {
  persona: any;
  missions: any[];
  updatePersona: (p: any) => Promise<void>;
  addMission: (m: any) => Promise<void>;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [persona, setPersona] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);

  const refresh = useCallback(async () => {
    if (!user) return;
    const [p, m] = await Promise.all([
      getUserPersona(user.uid),
      getRecentMissions(user.uid)
    ]);
    setPersona(p);
    setMissions(m);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updatePersona = async (p: any) => {
    if (!user) return;
    await saveUserPersona(user.uid, p);
    setPersona(p);
  };

  const addMission = async (m: any) => {
    if (!user) return;
    const id = await saveMissionRecord(user.uid, m);
    if (id) {
      setMissions(prev => [{ id, ...m, createdAt: new Date() }, ...prev]);
    }
  };

  return (
    <UserContext.Provider value={{ persona, missions, updatePersona, addMission, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
