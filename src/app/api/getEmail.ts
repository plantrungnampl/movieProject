"use server";

import { db } from "@/service/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

export async function getUserId(email: string) {
  try {
    const docRef = await getDocs(collection(db, "users", email.toString()));
    const data = docRef.docs.map((doc) => {
      return {
        id: doc?.id,
        data: doc?.data(),
      };
    });
    return data;
  } catch (err) {
    console.error("Error adding document to Firestore: get user id", err);
  }
}
