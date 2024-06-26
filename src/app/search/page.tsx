import React, { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export const metadata = {
  title: "search",
  description: "search movie",
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { q: searchValue } = searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/searchResults?q=${searchValue}`
  );
  const data = await res.json();
  const results = data.results;

  return (
    <div>
      <SearchResults results={results} searchValue={searchValue} />
    </div>
  );
};

export default SearchPage;
