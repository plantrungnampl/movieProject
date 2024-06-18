"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const API_KEY = process.env.API_KEY;
// result is type: "movie" | "tv" | "person" | "collection" | "company" | "keyword"
export default function Collections({
  params,
}: {
  params: {
    result: string;
  };
}) {
  const { result } = params;
  const [resultsData, setResultsData] = useState([]);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q") || "";
  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${result}?api_key=${API_KEY}&query=${searchValue}&include_adult=false&language=en-US&page=1`
      );
      const data = response.data;
      setResultsData(data.results);
    };

    if (searchValue) {
      fetchResults();
    }
  }, [searchValue, result]);

  return <>
    <div>
      {resultsData.length > 0 ? (
        resultsData.map((item: any) => (
          <Link
            href={{
              pathname: `/${result}/${item.id}`,
              query: { q: searchValue },
            }}
            key={item.id}
          >
            <Card
              className="flex relative gap-5 bg-clip-border rounded-xl  w-full flex-row mb-4"
              key={item.id}
            >
              {item?.poster_path ||
              item?.backdrop_path ||
              item?.profile_path ||
              item?.known_for?.backdrop_path ||
              item?.logo_path ? (
                <div className="relative flex bg-clip-border rounded-xl w-full flex-row mb-4">
                  <div className="relative w-1/5 m-0 overflow-hidden  rounded-r-none bg-clip-border rounded-xl shrink-0">
                    <Image
                      className="rounded object-cover w-full h-full"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.poster_path ||
                        item?.backdrop_path ||
                        item.profile_path ||
                        item?.known_for?.backdrop_path ||
                        item?.logo_path
                      }`}
                      alt=""
                      width={300}
                      height={300}
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                  </div>
                  <div className="flex">
                    <CardContent className="flex flex-col justify-start gap-2 p-3">
                      <CardTitle>
                        {item.original_title ||
                          item.name ||
                          item.original_name}
                      </CardTitle>
                      <CardDescription>
                        {item?.first_air_date || item?.release_date}
                      </CardDescription>
                      <CardDescription>{item?.overview}</CardDescription>
                    </CardContent>
                  </div>
                </div>
              ) : (
                <div className="relative flex bg-clip-border rounded-xl w-full flex-row mb-4">
                  <CardContent className="flex flex-col justify-center gap-2 p-3">
                    <CardTitle> {item.original_title || item.name}</CardTitle>
                    <CardDescription>
                      {item.first_air_date || item.release_date}
                    </CardDescription>
                    <CardDescription>{item.overview}</CardDescription>
                  </CardContent>
                </div>
              )}
            </Card>
          </Link>
        ))
      ) : (
        <div className="flex flex-col justify-center gap-2 p-3">
          <CardContent className="flex flex-col justify-center gap-2 p-3">
            <CardTitle> {`No results found for ${searchValue}`}</CardTitle>
            <CardDescription> {`Please try again`}</CardDescription>
          </CardContent>
        </div>
      )}
    </div>
  </>;
}
