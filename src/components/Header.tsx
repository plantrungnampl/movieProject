"use client";
import React, { Suspense, use, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { Button } from "./ui/button";
import ToggleMode from "./ToggleMode";
import Link from "next/link";
import { AiFillBook } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import Loading from "@/app/loading";
import { auth } from "@/service/firebase";
import { userProps } from "../model/types";
import SearchBox from "@/app/search/SearchBox";

export default function Header() {
  const route = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState<userProps | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountId");

    route.push("/login");
    toast({
      title: "Logout success",
      description: "You have successfully logged out",
      style: {
        backgroundColor: "green",
        color: "white",
      },
      duration: 3000,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center p-3 bg-slate-700 shadow-sm  fixed top-0 right-0 left-0 w-full z-10">
        <div className="flex gap-3 items-center">
          <Suspense fallback={<Loading />}>
            <MenuItem title="Home" address="/" Icon={AiFillHome} />
          </Suspense>

          {/* <MenuItem title="About" address="/about" Icon={AiFillInfoCircle} /> */}
          <Suspense fallback={<Loading />}>
            <MenuItem title="Top rate" address="/top-rate" Icon={AiFillStar} />
          </Suspense>
        </div>
        <div className="w-1/2 ">
          <Suspense fallback={<Loading />}>
            <SearchBox />
          </Suspense>
        </div>
        {user ? (
          <div className="flex gap-2 ">
            <div>
              <ToggleMode />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {user.reloadUserInfo?.photoUrl ? (
                  <Avatar>
                    <AvatarImage
                      src={user.reloadUserInfo?.photoUrl}
                      alt="@shadcn"
                    />
                    <AvatarFallback>{user.email}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Button>{user.email}</Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/watchlist/${user.email}`}>WatchList</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-2 ">
            <div>
              <ToggleMode />
            </div>
            <Button>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button variant={"outline"}>
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
