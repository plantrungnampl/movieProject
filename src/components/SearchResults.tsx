import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";

const SearchResults = ({
  results,
  searchValue,
}: {
  results: any[];
  searchValue: string;
}) => {
  if (!results) {
    notFound();
  }

  return (
    <div>
      <p className="uppercase mb-3">
        <span>{`Showing ${results.length} result(s) for ${searchValue}`}</span>
      </p>
      {results.length > 0 ? (
        results.map((item) => (
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
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-center gap-2">
                <CardTitle>{item.original_title || item.name}</CardTitle>
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
            <CardTitle>{`No results found for ${searchValue}`}</CardTitle>
            <CardDescription>{`Please try again`}</CardDescription>
          </CardContent>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
