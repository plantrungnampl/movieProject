// "use client";
// import React, { Suspense, use, useCallback, useEffect, useState } from "react";
// import MenuItem from "../MenuItem";
// import { Button } from "../ui/button";
// import ToggleMode from "../ToggleMode";
// import Link from "next/link";
// import { AiFillStar } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { IoPeople } from "react-icons/io5";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import { TiVideoOutline } from "react-icons/ti";
// import { AiFillCarryOut } from "react-icons/ai";
// import { useToast } from "../ui/use-toast";
// import { auth } from "@/service/firebase";
// import { userProps } from "../../model/types";
// import SearchBox from "@/app/search/SearchBox";
// export default function Header() {
//   const route = useRouter();
//   const { toast } = useToast();
//   const [user, setUser] = React.useState<userProps | null>(null);

//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const controlNavbar = useCallback(() => {
//     if (window.scrollY > lastScrollY) {
//       // if scroll down hide the navbar
//       setShow(false);
//     } else {
//       // if scroll up show the navbar
//       setShow(true);
//     }

//     setLastScrollY(window.scrollY);
//   }, [lastScrollY]);

//   useEffect(() => {
//     window.addEventListener("scroll", controlNavbar);

//     return () => {
//       window.removeEventListener("scroll", controlNavbar);
//     };
//   }, [lastScrollY, controlNavbar]);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("accountId");

//     route.push("/login");
//     toast({
//       title: "Logout success",
//       description: "You have successfully logged out",
//       style: {
//         backgroundColor: "green",
//         color: "white",
//       },
//       duration: 3000,
//     });
//   };

//   return (
//     <>
//       <div
//         className={` justify-between items-center p-3 bg-slate-700 fixed top-0 w-full z-10 shadow-2xl transition duration-300 ease-out transform    ${
//           show ? "flex transition duration-300 ease-out transform" : "hidden"
//         } `}
//       >
//         <div>
//           <Menubar className={`nav ${show ? "flex" : "hidden"}`}>
//             <MenubarMenu>
//               <Link href="/" passHref>
//                 <MenubarTrigger className="cursor-pointer">Home</MenubarTrigger>
//               </Link>
//             </MenubarMenu>
//             <MenubarMenu>
//               <MenubarTrigger>Tv Shows</MenubarTrigger>
//               <MenubarContent>
//                 <MenubarItem>
//                   <MenuItem
//                     title="Popular"
//                     address="/tv/popular"
//                     Icon={AiFillStar}
//                   />
//                 </MenubarItem>
//                 <MenubarItem>
//                   <MenuItem
//                     title="Airring Today"
//                     address="/tv/airring-today"
//                     Icon={AiFillCarryOut}
//                   />
//                 </MenubarItem>
//                 <MenubarItem>
//                   <MenuItem
//                     title="On TV"
//                     address="/tv/on-tv"
//                     Icon={TiVideoOutline}
//                   />
//                 </MenubarItem>
//                 <MenubarItem>
//                   <MenuItem
//                     title="Top Rated"
//                     address="/tv/top-rated"
//                     Icon={TiVideoOutline}
//                   />
//                 </MenubarItem>
//               </MenubarContent>
//             </MenubarMenu>
//             <MenubarMenu>
//               <MenubarTrigger>
//                 <Suspense>People</Suspense>
//               </MenubarTrigger>
//               <MenubarContent>
//                 <MenubarItem>
//                   <MenuItem
//                     title="Popular People"
//                     address="/people/popular-people"
//                     Icon={IoPeople}
//                   />
//                 </MenubarItem>
//               </MenubarContent>
//             </MenubarMenu>
//           </Menubar>
//         </div>
//         <div className="w-1/2 ">
//           <SearchBox />
//         </div>
//         {user ? (
//           <div className="flex gap-2 ">
//             <div>
//               <ToggleMode />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 {user.reloadUserInfo?.photoUrl ? (
//                   <Avatar>
//                     <AvatarImage
//                       src={user.reloadUserInfo?.photoUrl}
//                       alt="@shadcn"
//                     />
//                     <AvatarFallback>{user.email}</AvatarFallback>
//                   </Avatar>
//                 ) : (
//                   <Button>{user.email}</Button>
//                 )}
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuItem>
//                   <Link href={"/profile"}>Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href={`/watchlist/${user.email}`}>WatchList</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         ) : (
//           <div className="flex gap-2 ">
//             <div>
//               <ToggleMode />
//             </div>
//             <Button>
//               <Link href={"/login"}>Login</Link>
//             </Button>
//             <Button variant={"outline"}>
//               <Link href={"/register"}>Register</Link>
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
"use client";
import React, { Suspense, use, useCallback, useEffect, useState } from "react";
import MenuItem from "../MenuItem";
import { Button } from "../ui/button";
import ToggleMode from "../ToggleMode";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
import { TiVideoOutline } from "react-icons/ti";
import { AiFillCarryOut } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { auth } from "@/service/firebase";
import { userProps } from "../../model/types";
import SearchBox from "@/app/search/SearchBox";

export default function Header() {
  const route = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState<userProps | null>(null);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, controlNavbar]);

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
        className={`justify-between items-center p-3 bg-slate-700 fixed top-0 w-full z-10 shadow-2xl transition duration-300 ease-out transform ${
          show ? "flex transition duration-300 ease-out transform" : "hidden"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between w-full">
          <Menubar className={`nav ${show ? "flex" : "hidden"}`}>
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
                    title="Popular"
                    address="/tv/popular"
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
                <MenubarItem>
                  <MenuItem
                    title="Top Rated"
                    address="/tv/top-rated"
                    Icon={TiVideoOutline}
                  />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Suspense>People</Suspense>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <MenuItem
                    title="Popular People"
                    address="/people/popular-people"
                    Icon={IoPeople}
                  />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="w-full md:w-1/2 mt-2 md:mt-0">
            <SearchBox />
          </div>
          {user ? (
            <div className="flex gap-2 mt-2 md:mt-0">
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
            <div className="flex gap-2 mt-2 md:mt-0">
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
      </div>
    </>
  );
}
