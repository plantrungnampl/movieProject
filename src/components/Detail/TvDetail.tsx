import Image from "next/legacy/image";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TrailerDialog from "@/components/TrailerDialog";
import BookmarkButton from "@/components/BookmarkButton";
import { TvDetailProps } from "../../model/types";
import RatingBar from "../RatingBar";
const TvDetail = ({
  tvDetail,
  watchList,
  handleBookmarkClick,
}: TvDetailProps) => {
  return (
    <div className="relative flex gap-5 bg-clip-border rounded-xl shadow-md w-full flex-row mb-4">
      <div className="relative w-1/5 m-0 overflow-hidden rounded-r-none bg-clip-border rounded-xl shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`}
          alt={tvDetail.title}
          width={300}
          height={400}
          className="object-cover rounded w-full h-full"
        />
        <div className="absolute rounded-3xl left-2 bottom-0 bg-black w-auto h-auto  ">
          <span className="">
            <RatingBar rating={Math.round(tvDetail.vote_average * 10)} />
          </span>
        </div>
      </div>
      <div className="max-w-[960px]">
        <h2 className="text-2xl font-bold">
          {tvDetail.name || tvDetail.original_name}
        </h2>
        <p>{tvDetail.release_date}</p>
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
              trailer={tvDetail.trailerKey}
              buttonTitle="Video trailers "
            />
          </div>
          <div className="mt-3">
            <h3 className="font-bold">Overview</h3>
            <p>{tvDetail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetail;
export const revalidate = 60;
