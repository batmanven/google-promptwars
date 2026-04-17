import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export const saveUserPersona = async (userId: string, persona: any) => {
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { persona, updatedAt: new Date() }, { merge: true });
  } catch (err) {
    return null;
  }
};

export const getUserPersona = async (userId: string) => {
  try {
    const userDoc = doc(db, "users", userId);
    const snap = await getDoc(userDoc);
    return snap.exists() ? snap.data().persona : null;
  } catch (err) {
    return null;
  }
};

export const saveMissionRecord = async (userId: string, mission: any) => {
  try {
    const missionRef = doc(collection(db, "users", userId, "missions"));
    await setDoc(missionRef, { ...mission, createdAt: new Date() });
    return missionRef.id;
  } catch (err) {
    return null;
  }
};

export const getRecentMissions = async (userId: string) => {
  try {
    const q = query(
      collection(db, "users", userId, "missions"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    return [];
  }
};
