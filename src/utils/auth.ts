"use server";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";

export async function isLoggedIn(): Promise<boolean> {
  // const token = localStorage.getItem("authToken");
  const session = cookies().get(SESSION_COOKIE_NAME);
  return session !== null;
  // return token !== null && token.length > 0;
}
