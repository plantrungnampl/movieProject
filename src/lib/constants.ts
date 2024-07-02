export type SortFilterItem = {
  title: string;
  slug: string | null;
  // sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  reverse: false,
};

// export const sorting: SortFilterItem[] = [
//   defaultSort,
//   {
//     title: "Trending",
//     slug: "trending-desc",
//     reverse: false,
//   }, // asc
//   {
//     title: "Latest arrivals",
//     slug: "latest-desc",
//     reverse: true,
//   },
// ];
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const ROOT_ROUTE = "/login";
export const HOME_ROUTE = "/";

export const SESSION_COOKIE_NAME = "user_session";
