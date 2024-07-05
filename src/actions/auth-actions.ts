"use server";
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect(HOME_ROUTE);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
