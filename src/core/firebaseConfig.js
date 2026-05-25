import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "API_KEY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "PROJECT_ID.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "PROJECT_ID",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "PROJECT_ID.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "SENDER_ID",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "APP_ID"
};

// Se apiKey for "API_KEY", significa que o dev não configurou ainda.
export const isMock = firebaseConfig.apiKey === "API_KEY" || !process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
