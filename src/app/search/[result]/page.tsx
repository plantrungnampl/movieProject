"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
const API_KEY = process.env.API_KEY;
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
  const searchValue = searchParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${result}?api_key=${API_KEY}&query=${searchValue}&include_adult=false&language=en-US&page=1`
      );
      const data = await response.json();
      setResultsData(data.results);
    };

    if (searchValue) {
      fetchResults();
    }
  }, [searchValue, result]);
  console.log(resultsData);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div>
          <p className="uppercase mb-3 ">
            <span>{` Showing ${result.length} result for ${searchValue}`}</span>
          </p>
          {resultsData.length > 0 ? (
            resultsData.map((item: any) => (
              <Link href={`/movies/${item.id}`} key={item.id}>
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
                        />
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
                      {/* <div className="w-[300px] h-[300px]">
                      <Image
                        className="rounded object-cover w-full h-full"
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/w500${item?.logo_path}`}
                        alt=""
                        width={300}
                        height={300}
                      />
                    </div> */}
                      <CardContent className="flex flex-col justify-center gap-2 p-3">
                        <CardTitle>
                          {" "}
                          {item.original_title || item.name}
                        </CardTitle>
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
            <h1>No result found</h1>
          )}
        </div>
      </Suspense>
    </>
  );
}
