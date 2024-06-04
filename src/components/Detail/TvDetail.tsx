import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TrailerDialog from "@/components/TrailerDialog";
import BookmarkButton from "@/components/BookmarkButton";
import { TvDetailProps } from "../../model/types";
const TvDetail = ({
  tvDetail,
  watchList,
  handleBookmarkClick,
}: TvDetailProps) => {
  return (
    <div className="flex gap-8">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`}
          alt={tvDetail.title}
          width={500}
          height={450}
          className="object-cover rounded"
        />
      </div>
      <div className="max-w-[960px]">
        <h2>{tvDetail.name || tvDetail.original_name}</h2>
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
            <TrailerDialog trailerKey={tvDetail.trailerKey} />
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
