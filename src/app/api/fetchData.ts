"use server";
import { db } from "@/service/firebase";

import { collection, getDocs } from "firebase/firestore";
// get user data form firebase data (firestore)
export async function getSerVerData(userId: string) {
  try {
    const snapshot = await getDocs(
      collection(db, "users", userId.toString(), "watchlist")
    );
    const data = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
    }));
    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
