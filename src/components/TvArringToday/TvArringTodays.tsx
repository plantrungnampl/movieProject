import { TopRateMovieProps } from "@/model/topRate";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import RatingBar from "../RatingBar";
import Loading from "@/app/loading";

export default function TvArringTodays({
  filteredMovies,
}: {
  filteredMovies: TopRateMovieProps[];
}) {
  return (
    <>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movieItem) => {
          const isMovie = movieItem.media_type === "movie";
          const href = isMovie
            ? `/movies/${movieItem.id}`
            : `/tv/${movieItem.id}`;
          return (
            <div
              key={movieItem.id}
              className="relative flex flex-col bg-clip-border rounded-xl w-1/5"
            >
              <Link
                // className="relative flex flex-col bg-clip-border rounded-xl w-1/5"
                href={href}
              >
                <Card className="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl flex-card-cal">
                  <div className=" relative">
                    <Image
                      priority={true}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        })
      ) : (
        <div className="flex w-full">
          <Loading number={filteredMovies.length} />
          <h1>not found</h1>
        </div>
      )}
    </>
  );
}
