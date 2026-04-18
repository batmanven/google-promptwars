import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";

export const loginAnonymous = async () => {
  if (!auth) return null;
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    return null;
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
