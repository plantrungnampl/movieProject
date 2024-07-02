"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IItem } from "@/model/types";
import RatingBar from "../RatingBar";

export default function WatchLists({ item }: { item: IItem }) {
  const isMovie = item.media_type === "movie";
  const href = isMovie ? `/movies/${item.id}` : `/tv/${item.id}`;

  return (
    <Link href={href}>
      <div className="relative flex bg-clip-border rounded-xl shadow-md w-full flex-row mb-4">
        <div className="relative w-1/5 m-0 overflow-hidden rounded-r-none bg-clip-border rounded-xl shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            width={200}
            height={300}
            alt="card-image"
            className="object-cover w-full h-full"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="p-6">
          <div className="bg-black w-fit rounded-3xl">
            <RatingBar rating={Math.round(item.vote_average * 10)} />
          </div>
          <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal uppercase">
            {item.title}
          </h6>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {item.release_date}
          </h4>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed ">
            {item.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
