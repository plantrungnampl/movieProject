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
