"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";

import { getDataMovieTv } from "@/app/api/getMovieTv";
import { DetailProps } from "../../../model/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addToWatchList,
  ifExitItem,
  removeFromWatchList,
} from "@/service/serives";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toastUtil";
import TvDetail from "@/components/Detail/TvDetail";

export default function Detail({ params }: DetailProps) {
  const router = useRouter();
  const { id } = params;
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watchList, setWatchList] = useState<boolean | null | any>(null);
  console.log(detail);
  useEffect(() => {
    async function fetchData() {
      const data = await getDataMovieTv(id);
      if (data.error) {
        setError(data.error);
      } else {
        const trailer = data?.videos?.results?.find(
          (video: any) =>
            (video.type === "Teaser" ||
              video.type === "Trailer" ||
              "Behind the Scenes" ||
              "Featurette" ||
              "Clip") &&
            video.site === "YouTube"
        );
        setDetail({ ...data, trailerKey: trailer?.key || null });
        // setDetail(data);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

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

  if (loading) {
    return <Loading />;
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

  return (
    <TvDetail
      watchList={watchList}
      tvDetail={detail}
      handleBookmarkClick={handleBookmarkClick}
    />
  );
}
