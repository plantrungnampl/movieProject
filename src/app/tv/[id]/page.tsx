"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import Loading from "@/app/loading";
import { DetailProps } from "../../../model/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addToWatchList,
  ifExitItem,
  removeFromWatchList,
} from "@/service/serives";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toastUtil";
import useSWR from "swr";
import { fetcher } from "../../../lib/constants";
const TvDetail = lazy(() => import("@/components/Detail/TvDetail"));
const Background = lazy(() => import("@/components/Background"));
export default function Detail({ params }: DetailProps) {
  const router = useRouter();
  const { id } = params;

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watchList, setWatchList] = useState<boolean | null | any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const {
    data: detail,
    error,
    isLoading,
  } = useSWR(`/api/tmdb/detailsTv/?id=${id}`, fetcher);

  useEffect(() => {
    if (detail) {
      const trailer = detail.videos?.results?.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    }
  }, [detail]);

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

  if (isLoading) {
    return <Loading number={1} />;
  }

  if (error) {
    return <div>Something went wrong: {error} </div>;
  }
  const handleBookmarkClick = async () => {
    if (!currentUser) {
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
      name: detail?.name || detail?.original_name,
      original_name: detail?.original_name,
      title: detail?.name || detail?.original_name,
      overview: detail?.overview,
      poster_path: detail?.poster_path,
    };

    const dataId = detail?.id.toString();
    try {
      if (watchList) {
        await removeFromWatchList(currentUser?.uid, dataId);
        toast({
          title: "Removed from Watchlist",
          description: "You have removed this movie from your watchlist",
          style: {
            color: "red",
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
            color: "green",
          },
          duration: 5000,
        });
        setWatchList(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const backdropUrl = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`;
  return (
    <Background src={backdropUrl}>
      <div className="absolute top-0 left-0 w-full h-full ">
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(220, 220, 220, 1) calc((50vw - 170px) - 340px), rgba(220, 220, 220, 0.84) 50%, rgba(220, 220, 220, 0.84) 100%)",
            minHeight: "100vh",
          }}
        >
          <Suspense fallback={<Loading number={1} />}>
            <TvDetail
              watchList={watchList}
              tvDetail={detail}
              handleBookmarkClick={handleBookmarkClick}
              trailerKey={trailerKey}
            />
          </Suspense>
        </div>
      </div>
    </Background>
  );
}
