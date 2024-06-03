// "use client";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Loading from "@/app/loading";
// import Image from "next/image";
// import ReactPlayer from "react-player/youtube";
// import { FaBookmark, FaHeart } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { FaRegBookmark } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useRouter } from "next/navigation";
// import {
//   addToWatchList,
//   ifExitItem,
//   removeFromWatchList,
// } from "../../../service/serives";
// import { auth } from "@/service/firebase";
// import { toast } from "@/components/ui/use-toast";
// import { set } from "react-hook-form";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDataMovieServer } from "@/app/api/getDataMovie";
// import { DetailProps } from "../../../../types";

// function isLoggedIn(): boolean {
//   const token = localStorage.getItem("authToken");
//   return token !== null && token.length > 0;
// }

// export default function Detail({ params }: DetailProps) {
//   const { id } = params;
//   // const { currentUser } = auth;
//   const router = useRouter();
//   const [detail, setDetail] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [watchList, setWatchList] = useState<boolean | null | any>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       if (user) {
//         ifExitItem(user.uid, id).then((data) => {
//           setWatchList(data);
//         });
//       }
//     });
//     return () => unsubscribe();
//   }, [id]);
//   useEffect(() => {
//     async function fetchData() {
//       const data = await getDataMovieServer(id);
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setDetail(data);
//       }
//       setLoading(false);
//     }
//     fetchData();
//   }, [id]);

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div>Đã có lỗi xảy ra: {error}</div>;
//   }

//   const trailer = detail.videos?.results?.find(
//     (video: any) => video.type === "Trailer" && video.site === "YouTube"
//   );

//   const handleBookmarkClick = async () => {
//     if (!isLoggedIn()) {
//       toast({
//         title: "Login",
//         description: "Please login to continue",
//         style: {
//           background: "red",
//           color: "white",
//         },
//       });
//       router.push("/login");
//       return;
//     }
//     const data = {
//       id: detail?.id,
//       title: detail?.title,
//       overview: detail?.overview,
//       poster_path: detail?.poster_path,
//       backdrop_path: detail?.backdrop_path,
//       vote_average: detail?.vote_average,
//       release_date: detail?.release_date,
//     };
//     const dataId = detail?.id.toString();

//     try {
//       if (watchList) {
//         await removeFromWatchList(currentUser?.uid, dataId);
//         toast({
//           title: "Removed from Watchlist",
//           description: "You have removed this movie from your watchlist",
//           style: {
//             background: "green",
//             color: "white",
//           },
//           duration: 5000,
//         });
//         setWatchList(false);
//       } else {
//         await addToWatchList(currentUser?.uid, dataId, data);
//         toast({
//           title: "Added to Watchlist",
//           description: "You have added this movie to your watchlist",
//           style: {
//             background: "green",
//             color: "white",
//           },
//           duration: 5000,
//         });
//         setWatchList(true);
//       }
//     } catch (err) {
//       console.log(err);
//       toast({
//         title: "Error",
//         description: "There was an error adding the movie to your watchlist",
//         style: {
//           background: "red",
//           color: "white",
//         },
//         duration: 5000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="flex gap-8 ">
//         <div className=" ">
//           <Image
//             src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
//             alt={detail.title}
//             width={500}
//             height={450}
//             className="object-cover rounded"
//           />
//         </div>
//         <div className="max-w-[960px]">
//           <h2>{detail.title || detail.original_title}</h2>
//           <p>{detail.release_date}</p>
//           <div>
//             <div className="flex gap-3">
//               <Button onClick={handleBookmarkClick}>
//                 {watchList ? <FaBookmark /> : <FaRegBookmark />}
//               </Button>
//               <Button>
//                 <FaHeart />
//               </Button>
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline">Video Trailer</Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle className="pt-4 px-4">
//                       Video Trailer
//                     </DialogTitle>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     {trailer ? (
//                       <ReactPlayer
//                         url={`https://www.youtube.com/watch?v=${trailer.key}`}
//                         width="942px"
//                         height="530px"
//                       />
//                     ) : (
//                       <div>No trailer available</div>
//                     )}
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//             <div className="mt-3">
//               <h3 className="font-bold">Overview</h3>
//               <p>{detail.overview}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";
import { getDataMovieServer } from "@/app/api/getDataMovie";
import { DetailProps } from "../../../../types";

import Loading from "@/app/loading";
import { isLoggedIn } from "@/utils/auth";
import {
  addToWatchList,
  ifExitItem,
  removeFromWatchList,
} from "@/service/serives";
import MovieDetail from "@/components/Detail/MovieDetail";

export default function Detail({ params }: DetailProps) {
  const { id } = params;
  const router = useRouter();
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watchList, setWatchList] = useState<boolean | null | any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        ifExitItem(user.uid, id).then((data) => {
          setWatchList(data);
        });
      }
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const data = await getDataMovieServer(id);
      if (data.error) {
        setError(data.error);
      } else {
        const trailer = data.videos?.results?.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );
        setDetail({ ...data, trailerKey: trailer?.key || null });
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleBookmarkClick = async () => {
    if (!isLoggedIn()) {
      toast({
        title: "Login",
        description: "Please login to continue",
        style: {
          background: "red",
          color: "white",
        },
      });
      router.push("/login");
      return;
    }
    const data = {
      id: detail?.id,
      title: detail?.title,
      overview: detail?.overview,
      poster_path: detail?.poster_path,
      backdrop_path: detail?.backdrop_path,
      vote_average: detail?.vote_average,
      release_date: detail?.release_date,
    };
    const dataId = detail?.id.toString();

    try {
      if (watchList) {
        await removeFromWatchList(currentUser?.uid, dataId);
        toast({
          title: "Removed from Watchlist",
          description: "You have removed this movie from your watchlist",
          style: {
            background: "green",
            color: "white",
          },
          duration: 5000,
        });
        setWatchList(false);
      } else {
        await addToWatchList(currentUser?.uid, dataId, data);
        toast({
          title: "Added to Watchlist",
          description: "You have added this movie to your watchlist",
          style: {
            background: "green",
            color: "white",
          },
          duration: 5000,
        });
        setWatchList(true);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "There was an error adding the movie to your watchlist",
        style: {
          background: "red",
          color: "white",
        },
        duration: 5000,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Đã có lỗi xảy ra: {error}</div>;
  }

  return (
    <MovieDetail
      detail={detail}
      watchList={watchList}
      handleBookmarkClick={handleBookmarkClick}
    />
  );
}
