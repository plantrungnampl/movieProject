import React, { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import { fetchSearchResults } from "../api/fetchSearchResults";

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
  const data = await fetchSearchResults(searchValue);
  const results = data.results;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <SearchResults results={results} searchValue={searchValue} />
      </div>
    </Suspense>
  );
};

export default SearchPage;
