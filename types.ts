// types.ts
export interface UserWatchList {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export interface UserTest {
  id?: string;
  watchlist?: UserWatchList[];
  email?: string;
}
