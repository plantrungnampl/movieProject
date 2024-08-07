// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   setDoc,
//   doc,
//   getDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { auth, db } from "./firebase";
// import { toast } from "@/components/ui/use-toast";

// export const addDocument = async (collectionName: string, data: any) => {
//   try {
//     const docRef = await addDoc(collection(db, collectionName), {
//       ...data,
//       createdAt: serverTimestamp(),
//     });
//     return docRef;
//   } catch (error: any) {
//     console.error("Error adding document to Firestore user:", error);
//     throw new Error(error);
//   }
// };
// // // add to database
// export const addDocumentWatchList = async (
//   collectionName: string,
//   data: any
// ) => {
//   try {
//     const docRef = await addDoc(collection(db, collectionName), {
//       ...data,
//       createdAt: serverTimestamp(),
//     });
//     return docRef;
//   } catch (err) {
//     console.error("Error adding document to Firestore WathList:", err);
//   }
// };
// // add watchlist client
// export const addToWatchList = async (userId: any, dataId: any, data: any) => {
//   try {
//     await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
//     toast({
//       title: "Added to Watchlist",
//       description: "You have added this movie to your watchlist",
//       duration: 5000,
//     });
//   } catch (err) {
//     console.error("Error adding document to Firestore: add to watch list", err);
//     toast({
//       title: "Error",
//       description: "Something went wrong",
//       duration: 5000,
//     });
//   }
// };
// //check if data movie exist in watchlist
// export const ifExitItem = async (userId: any, dataId: string) => {
//   try {
//     const docRef = doc(
//       db,
//       "users",
//       userId?.toString(),
//       "watchlist",
//       dataId?.toString()
//     );
//     const docSnap = await getDoc(docRef);
//     return docSnap.exists();
//   } catch (err) {
//     console.error("Error adding document to Firestore: exit item", err);
//     toast({
//       title: "Error",
//       description: "Something went wrong aha",
//       duration: 5000,
//     });
//   }
// };
// export async function removeFromWatchList(userId: string, dataId: string) {
//   try {
//     const docRef = doc(db, "users", userId, "watchlist", dataId);
//     await deleteDoc(docRef);
//   } catch (err) {
//     console.error("error adding document to Firestore: exit item", err);
//     toast({
//       title: "Error",
//       description: "Something went wrong",
//       duration: 5000,
//     });
//   }
// }
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { toast } from "@/components/ui/use-toast";

const showToast = (title: string, description: string) => {
  toast({
    title,
    description,
    duration: 5000,
  });
};

export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef;
  } catch (error: any) {
    console.error("Error adding document to Firestore:", error);
    throw new Error(error);
  }
};

export const addToWatchList = async (
  userId: string,
  dataId: string,
  data: any
) => {
  try {
    await setDoc(doc(db, "users", userId, "watchlist", dataId), {
      ...data,
      createdAt: serverTimestamp(),
    });
    showToast(
      "Added to Watchlist",
      "You have added this movie to your watchlist"
    );
  } catch (err) {
    console.error("Error adding document to Firestore: add to watch list", err);
    showToast("Error", "Something went wrong");
  }
};

export const ifExitItem = async (userId: string, dataId: string) => {
  try {
    const docRef = doc(db, "users", userId, "watchlist", dataId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  } catch (err) {
    console.error("Error checking document existence in Firestore", err);
    showToast("Error", "Something went wrong");
    return false;
  }
};

export const removeFromWatchList = async (userId: string, dataId: string) => {
  try {
    const docRef = doc(db, "users", userId, "watchlist", dataId);
    await deleteDoc(docRef);
    showToast(
      "Removed from Watchlist",
      "You have removed this movie from your watchlist"
    );
  } catch (err) {
    console.error("Error removing document from Firestore", err);
    showToast("Error", "Something went wrong");
  }
};
