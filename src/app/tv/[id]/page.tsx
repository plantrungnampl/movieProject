"use client";
import { useState, useEffect, lazy } from "react";
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
import { DetailTvlayout } from "./layout";
const TvDetail = lazy(() => import("@/components/Detail/TvDetail"));
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
    <DetailTvlayout backdropUrl={backdropUrl}>
      <TvDetail
        watchList={watchList}
        tvDetail={detail}
        handleBookmarkClick={handleBookmarkClick}
        trailerKey={trailerKey}
      />
    </DetailTvlayout>
  );
}
