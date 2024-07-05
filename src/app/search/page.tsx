// import React, { Suspense } from "react";
// import SearchResults from "@/components/SearchResults";

// export const metadata = {
//   title: "search",
//   description: "search movie",
// };

// const SearchPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string };
// }) => {
//   const { q: searchValue } = searchParams;

//   const res = await fetch(
//     ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/searchResults?q=${searchValue}`
//   );
//   if (!res.ok) {
//     throw new Error(`Failed to fetch: ${res.statusText}`);
//   }
//   const data = await res.json();
//   const results = data.results;

//   return (
//     <div>
//       <SearchResults results={results} searchValue={searchValue} />
//     </div>
//   );
// };

// export default SearchPage;
// //
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
    ` https://movie-project-iygl.vercel.app/api/tmdb/searchResults?q=${searchValue}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Received non-JSON response:", text);
    throw new Error("Received non-JSON response");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      <SearchResults results={results} searchValue={searchValue} />
    </div>
  );
};

export default SearchPage;
