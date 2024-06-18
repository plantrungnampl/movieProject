"use client";
import Image from "next/legacy/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { IItem } from "@/model/types";
import RatingBar from "./RatingBar";
import { LoadingSkeleton } from "./SkeletonLoading/SkeletonLoading";
export default function CarouselItemComponent({ item }: { item: IItem }) {
  const isMovie = item.media_type === "movie";

  const href = isMovie ? `/movies/${item.id}` : `/tv/${item.id}`;
  return (
    <>
      <Link className="flex" href={href}>
        <Card className="flex-card-cal flex flex-col justify-start items-start ">
          <div className=" w-[200px] min-h-[200px] h-customs relative   ">
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.original_title || item.name}
              className="object-cover w-full h-full rounded-t-lg  "
              width={200}
              height={300}
              layout="responsive"
              priority={true}
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            />
            <div className="absolute rounded-3xl left-2 bottom-0 bg-black w-auto h-auto  ">
              <span>
                <RatingBar rating={Math.round(item.vote_average * 10)} />
              </span>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="truncate text-wrap">
              {item.original_title || item.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {item.first_air_date || item.release_date}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
