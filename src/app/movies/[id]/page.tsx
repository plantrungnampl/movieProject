"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";
import { getDataMovieServer } from "@/app/api/getDataMovie";
import { DetailProps } from "../../../model/types";
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
      // media_type: detail?.media_type,
      poster_path: detail?.poster_path,
      backdrop_path: detail?.backdrop_path,
      vote_average: detail?.vote_average,
      release_date: detail?.release_date,
    };
    console.log(detail);
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
