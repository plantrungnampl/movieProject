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
        <Card className="flex-card-cal max-w-sm ">
          <div className=" min-w-[300px] h-auto relative ">
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.original_title || item.name}
              className="object-contain w-full h-full rounded-t-lg  "
              width={400}
              height={500}
              layout="responsive"
              priority={true}
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            />
            <div className="absolute rounded-3xl left-2 bottom-0 bg-black w-auto h-auto  ">
              <span className="">
                <RatingBar rating={Math.round(item.vote_average * 10)} />
              </span>
            </div>
          </div>
          <CardHeader className="">
            <CardTitle>{item.original_title || item.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {item.first_air_date || item.release_date}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
