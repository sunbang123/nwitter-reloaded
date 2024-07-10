import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_TOKEN,
  authDomain: "stickers-9f4a7.firebaseapp.com",
  projectId: "stickers-9f4a7",
  storageBucket: "stickers-9f4a7.appspot.com",
  messagingSenderId: "350239623114",
  appId: "1:350239623114:web:3afccd9ab562d02dd67133"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);