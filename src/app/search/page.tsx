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
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "search",
  description: "search movie",
};

const fetchSearchResults = async (searchValue: string) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchValue}&page=1&include`
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
  if (!result || result.length === 0) {
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
        // <h1>No result found</h1>
        <h1>No result found</h1>
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
