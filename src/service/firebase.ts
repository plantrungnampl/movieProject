import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSNMLgoW4eMlmL3dFE-60k2HtdrMSPBE8",
  authDomain: "movieproject-9ef18.firebaseapp.com",
  projectId: "movieproject-9ef18",
  storageBucket: "movieproject-9ef18.appspot.com",
  messagingSenderId: "783353388784",
  appId: "1:783353388784:web:15da7bc6ea033654152c35",
  measurementId: "G-G0PVQTMD3T",
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export const auth = getAuth(app);
export const db = getFirestore(app);
