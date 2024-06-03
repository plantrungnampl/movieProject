import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TrailerDialog from "@/components/TrailerDialog";
import BookmarkButton from "@/components/BookmarkButton";
import { MovieDetailProps } from "../../../types";

const MovieDetail = ({
  detail,
  watchList,
  handleBookmarkClick,
}: MovieDetailProps) => {
  return (
    <div className="flex gap-8">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
          alt={detail.title}
          width={500}
          height={450}
          className="object-cover rounded"
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
            <TrailerDialog trailerKey={detail.trailerKey} />
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
