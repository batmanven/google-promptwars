import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";

export const loginAnonymous = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    return null;
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
