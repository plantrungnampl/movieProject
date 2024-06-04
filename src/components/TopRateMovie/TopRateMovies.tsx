import { TopRateMovieProps } from "@/model/topRate";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function TopRateMovies({
  topRate,
}: {
  topRate: TopRateMovieProps[];
}) {
  return (
    <>
      {topRate.map((movieItem) => {
        console.log("movieItem===", movieItem);
        const isMovie = movieItem.media_type === "movie";
        const href = isMovie
          ? `/movies/${movieItem.id}`
          : `/tv/${movieItem.id}`;

        return (
          <Link
            key={movieItem.id}
            className="relative flex flex-col bg-clip-border rounded-xl w-1/5  "
            href={href}
          >
            <Card className="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl flex-card-cal ">
              <div className="w-full flex justify-center items-center">
                <Image
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${
                    movieItem.poster_path || movieItem.backdrop_path
                  }`}
                  alt={movieItem.original_name || movieItem.name}
                  className="object-cover rounded w-full h-full"
                  width={200}
                  height={200}
                />
              </div>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center justify-between mb-2">
                  {movieItem.original_name || movieItem.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {movieItem.first_air_date}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
