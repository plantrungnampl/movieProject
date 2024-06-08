import Image from "next/legacy/image";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TrailerDialog from "@/components/TrailerDialog";
import BookmarkButton from "@/components/BookmarkButton";
import { MovieDetailProps } from "../../model/types";

const MovieDetail = ({
  detail,
  watchList,
  handleBookmarkClick,
}: MovieDetailProps) => {
  return (
    <div className=" relative flex gap-5 bg-clip-border rounded-xl shadow-md w-full flex-row mb-4  ">
      <div className=" relative w-1/5 m-0 overflow-hidden rounded-r-none bg-clip-border rounded-xl shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
          alt={detail.title}
          width={300}
          height={300}
          className="object-cover rounded w-full h-full"
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
            <TrailerDialog
              buttonTitle="video trailer"
              // movie={detail.trailerKey}
              trailer={detail.trailerKey}
            />
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
