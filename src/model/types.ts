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
}
export interface DetailProps {
  params: {
    id: string;
  };
}
export interface userProps {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;

  uid: string;
  emailVerified: boolean;
  reloadUserInfo: {
    photoUrl: string;
  };
}
export interface MovieDetailProps {
  detail: detaiMovie;
  watchList: boolean | null;
  handleBookmarkClick: () => void;
}

export interface TvDetailProps {
  tvDetail: TvDetailMovieProps;
  watchList: boolean | null;
  handleBookmarkClick: () => void;
}
export interface TvDetailMovieProps {
  id: number;
  title: string;
  overview: string;
  name: string;
  first_air_date: string;
  original_name: string;
  release_date: string;
  trailerKey: string;
  poster_path: string;
}
export interface detaiMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  release_date: string;
  original_title: string;
  trailerKey: string;
}
// button bookmarks props:
export interface BookmarkButtonProps {
  watchList: boolean | null;
  handleBookmarkClick: () => void;
}

export interface IItem {
  id: number;
  movie_id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  title: string;
  first_air_date: string;
  backdrop_path: string;
  release_date: string;
  media_type: string;
}

export interface IResult {
  result: IItem[];
  result1: IItem[];
}
