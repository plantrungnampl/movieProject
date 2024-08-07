import { TopRateMovieProps } from "@/model/topRate";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import RatingBar from "../RatingBar";

export default function PopularTvSeris({
  PopularTv,
}: {
  PopularTv: TopRateMovieProps[];
}) {
  return (
    <>
      {PopularTv.map((movieItem) => {
        const isMovie = movieItem.media_type === "movie";
        const href = isMovie
          ? `/movies/${movieItem.id}`
          : `/tv/${movieItem.id}`;
        return (
          <div
            key={movieItem.id}
            className="relative flex flex-col bg-clip-border rounded-xl w-1/5 "
          >
            <Link href={href} passHref>
              <Card className="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl flex-card-cal">
                <div className=" relative">
                  <Image
                    priority={true}
                    // loading="lazy
                    src={`https://image.tmdb.org/t/p/w500${
                      movieItem.poster_path || movieItem.backdrop_path
                    }`}
                    alt={movieItem.original_name || movieItem.name}
                    className="object-cover rounded w-full h-full"
                    width={400}
                    height={600}
                    blurDataURL={`https://image.tmdb.org/t/p/w500${
                      movieItem.poster_path || movieItem.backdrop_path
                    }`}
                    placeholder="blur"
                    sizes="100vw"
                    rel="preconnect"
                  />
                  <div className="absolute rounded-3xl bottom-0 bg-black w-auto h-auto  ">
                    <span className="">
                      <RatingBar
                        rating={Math.round(movieItem.vote_average * 10)}
                      />
                    </span>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center justify-between mb-2 truncate ">
                    <p className="truncate">
                      {movieItem.original_name ||
                        movieItem.name ||
                        movieItem.title}
                    </p>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {movieItem.first_air_date || movieItem.release_date}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        );
      })}
    </>
  );
}
