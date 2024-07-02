"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";
import { DetailProps } from "../../../model/types";
import Loading from "@/app/loading";
import { isLoggedIn } from "@/utils/auth";
import {
  addToWatchList,
  ifExitItem,
  removeFromWatchList,
} from "@/service/serives";
import useSWR from "swr";
import { fetcher } from "@/lib/constants";
const Background = lazy(() => import("@/components/Background"));

const MovieDetail = lazy(() => import("@/components/Detail/MovieDetail"));

export default function Detail({ params }: DetailProps) {
  const { id } = params;
  const router = useRouter();
  const {
    data: detail,
    error,
    isLoading,
  } = useSWR(`/api/tmdb/detailsMovie/?id=${id}`, fetcher);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watchList, setWatchList] = useState<boolean | null | any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

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
    if (detail) {
      const trailer = detail.videos?.results?.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    }
  }, [detail]);

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
            background: "yellow",
            color: "black",
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

  if (isLoading) {
    return <Loading number={1} />;
  }

  if (error) {
    return <div>Đã có lỗi xảy ra: {error}</div>;
  }
  const backdropUrl = `https://image.tmdb.org/t/p/original${
    detail.backdrop_path || detail.poster_path
  }`;

  return (
    <Background src={backdropUrl}>
      <div className="absolute top-0 left-0 w-full h-full  ">
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(220, 220, 220, 1) calc((50vw - 170px) - 340px), rgba(220, 220, 220, 0.84) 50%, rgba(220, 220, 220, 0.84) 100%)",
            minHeight: "100vh",
          }}
        >
          <Suspense fallback={<Loading number={1} />}>
            <MovieDetail
              detail={detail}
              watchList={watchList}
              trailerKey={trailerKey}
              handleBookmarkClick={handleBookmarkClick}
            />
          </Suspense>
        </div>
      </div>
    </Background>
  );
}
