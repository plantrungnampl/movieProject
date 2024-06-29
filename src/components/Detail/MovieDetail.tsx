import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/BookmarkButton";
import { MovieDetailProps } from "../../model/types";
import { Suspense, lazy } from "react";

const TrailerDialog = lazy(() => import("@/components/TrailerDialog"));

const MovieDetail = ({
  detail,
  watchList,
  handleBookmarkClick,
  trailerKey,
}: MovieDetailProps) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${detail?.poster_path}`;

  return (
    <div className="relative flex gap-5 bg-clip-border rounded-xl shadow-md w-full flex-row mb-4 p-5">
      <div className="relative w-1/5 m-0 overflow-hidden rounded-r-none bg-clip-border rounded-xl shrink-0">
        <Image
          src={posterUrl}
          alt={detail?.title}
          width={300}
          height={400}
          loading="lazy"
          className="object-cover rounded w-full h-full"
          blurDataURL={posterUrl}
          placeholder="blur"
          sizes="100vw"
        />
      </div>
      <div className="max-w-[960px]">
        <h2>{detail.title || detail.original_title}</h2>
        <p>{detail.release_date}</p>
        <div>
          <div className="flex gap-3">
            <BookmarkButton
              watchList={watchList}
              handleBookmarkClick={handleBookmarkClick}
            />
            <Button>
              <FaHeart />
            </Button>
            <Suspense fallback={<div>Loading.......</div>}>
              <TrailerDialog
                buttonTitle="Video trailer"
                trailer={trailerKey}
                title={detail.title}
              />
            </Suspense>
          </div>
          <div className="mt-3">
            <h3 className="font-bold">Overview</h3>
            <p>{detail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
