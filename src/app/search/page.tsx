import axios from "axios";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/legacy/image";
import Link from "next/link";
import RatingBar from "@/components/RatingBar";

export const metadata = {
  title: "search",
  description: "search movie",
};
const API_KEY = process.env.API_KEY;
const fetchSearchResults = async (searchValue: string) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

const SearchResults = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { q: searchValue } = searchParams;
  const data = await fetchSearchResults(searchValue);
  const result = data.results;
  if (!result) {
    notFound();
  }
  return (
    <div>
      <p className="uppercase mb-3 ">
        <span>{`Showing ${result.length} result(s) for ${searchValue}`}</span>
      </p>
      {result.length > 0 ? (
        result.map((item: any) => (
          <Link href={`/movies/${item.id}`} key={item.id}>
            <Card className="flex" key={item.id}>
              <CardHeader>
                <div className="w-[300px] h-[300px]">
                  <Image
                    className="rounded object-cover w-full h-full"
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${
                      item.poster_path || item.backdrop_path
                    }`}
                    alt={item.original_title || item.name}
                    width={300}
                    height={300}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-center gap-2">
                <CardTitle> {item.original_title || item.name}</CardTitle>
                <CardDescription>
                  {item.first_air_date || item.release_date}
                </CardDescription>
                <CardDescription>{item.overview}</CardDescription>
              </CardContent>
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
  );
};

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | null };
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults searchParams={searchParams as { [key: string]: string }} />
    </Suspense>
  );
};

export default SearchPage;
