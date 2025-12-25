import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase config is read from Vite env vars (VITE_...)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


if (!firebaseConfig.apiKey) {
  console.warn('Firebase config not found - make sure VITE_FIREBASE_* env vars are set');
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
