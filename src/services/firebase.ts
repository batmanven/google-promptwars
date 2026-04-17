import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

export async function initAetherServices(config: any) {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
    });
  }

  if (typeof window !== "undefined" && config.recaptchaKey) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(config.recaptchaKey),
        isTokenAutoRefreshEnabled: true
      });
    } catch {
      // App check already initialized or silent fail
    }
  }

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  if (typeof window !== "undefined") {
    isSupported().then(yes => yes ? getAnalytics(app) : null);
  }

  return { app, auth, db, storage };
}

export { app, auth, db, storage };
