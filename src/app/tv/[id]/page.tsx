"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import ReactPlayer from "react-player";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDataMovieTv } from "@/app/api/getMovieTv";

type DetailProps = {
  params: {
    id: string;
  };
};

export default function Detail({ params }: DetailProps) {
  const { id } = params;
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(detail);
  useEffect(() => {
    async function fetchData() {
      const data = await getDataMovieTv(id);
      if (data.error) {
        setError(data.error);
      } else {
        setDetail(data);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong: {error} </div>;
  }

  const trailer = detail.videos?.results?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="flex gap-8">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
          alt={detail.title}
          width={300}
          height={450}
          className="object-cover rounded"
        />
      </div>
      {/* content */}
      <div>
        <h2>{detail.name || detail.original_name}</h2>
        <p>{detail.release_date}</p>
        <div>
          <div className="flex gap-3">
            <Button>
              <FaBookmark />
            </Button>
            <Button>
              <FaHeart />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Video Trailer</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pt-4 px-4">Video Trailer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {trailer ? (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${trailer.key}`}
                      width="942px"
                      height="530px"
                    />
                  ) : (
                    <div>No trailer availble</div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-3">
            <h3 className="font-bold">Overview</h3>
            <p>{detail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
