import { auth } from "@/service/firebase";
import { addDocument } from "@/service/serives";
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await addDocument("users", {
      uuid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      providerId: user.providerData[0].providerId,
    });
    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }
    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

// export async function

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
export const LogoutEmailPassWorld = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};
export const LoginEmailOrPassWorld = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (!userCredential || !userCredential.user) {
      throw new Error(" sign in failed");
    }
    return userCredential.user.uid;
  } catch (err) {
    console.log(err);
  }
};
