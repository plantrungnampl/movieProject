import { db } from "@/service/firebase";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { UserWatchList } from "../../../types";
// export interface userWatchList {
//   id: string;
//   title: string;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
//   vote_average: string;
//   release_date: string;
// }
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
