"use client";
import React, { Suspense, use, useEffect, useState } from "react";
import MenuItem from "../MenuItem";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { Button } from "../ui/button";
import ToggleMode from "../ToggleMode";
import Link from "next/link";
import { AiFillBook } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { IoPeople } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FaCirclePlay } from "react-icons/fa6";
import { TiVideoOutline } from "react-icons/ti";
import { AiFillCarryOut } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import Loading from "@/app/loading";
import { auth } from "@/service/firebase";
import { userProps } from "../../model/types";
import SearchBox from "@/app/search/SearchBox";
import { AiFillNotification } from "react-icons/ai";
export default function Header() {
  const route = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState<userProps | null>(null);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
      setScrollDirection("down");
    } else {
      // if scroll up show the navbar
      setShow(true);
      setScrollDirection("up");
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
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
      <div
        className={` justify-between items-center p-3 bg-slate-700 fixed top-0 w-full z-10 shadow-2xl transition duration-300 ease-out transform    ${
          show ? "flex transition duration-300 ease-out transform" : "hidden"
        } `}
      >
        {/* nav */}
        <Menubar>
          <MenubarMenu>
            <Link href="/" passHref>
              <MenubarTrigger className="cursor-pointer">Home</MenubarTrigger>
            </Link>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Tv Shows</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <MenuItem
                  title="Top rate"
                  address="/tv/top-rate"
                  Icon={AiFillStar}
                />
              </MenubarItem>
              <MenubarItem>
                <MenuItem
                  title="Airring Today"
                  address="/tv/airring-today"
                  Icon={AiFillCarryOut}
                />
              </MenubarItem>
              <MenubarItem>
                <MenuItem
                  title="On TV"
                  address="/tv/on-tv"
                  Icon={TiVideoOutline}
                />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Movie</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <MenuItem
                  title="Popular"
                  address="/Movie/Popular"
                  Icon={AiFillStar}
                />
              </MenubarItem>
              <MenubarItem>
                <MenuItem
                  title="Now playing"
                  address="/Movie/Now-playing"
                  Icon={FaCirclePlay}
                />
              </MenubarItem>
              <MenubarItem>
                <MenuItem
                  title="Up coming"
                  address="/Movie/top-rate"
                  Icon={AiFillNotification}
                />
              </MenubarItem>
              <MenubarItem>
                <MenuItem
                  title="Top-rate"
                  address="/Movie/top-rate-movie"
                  Icon={AiFillStar}
                />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>People</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <MenuItem
                  title="Popular People"
                  address="/People/Popular-People"
                  Icon={IoPeople}
                />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {/* eng */}
        {/* <div className="flex gap-3 items-center">
          <MenuItem title="Home" address="/" Icon={AiFillHome} />
          <MenuItem title="Movie" address="/about" Icon={AiFillHome} />
          <MenuItem title="Top rate" address="/top-rate" Icon={AiFillStar} />
        </div> */}
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
