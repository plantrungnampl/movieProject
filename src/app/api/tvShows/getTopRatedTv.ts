import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
interface topRateResponse {
  results: any[];
  totalPages: number;
}

export const getTopRateTv = async (page: number): Promise<topRateResponse> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}&language=en-US`
    );
    return {
      results: res.data.results,
      totalPages: res.data.total_pages,
    };
  } catch (err) {
    console.log(err);
    return {
      results: [],
      totalPages: 0,
    };
  }
};
export const getTopRateTvByGenre = async (
  genreId: number | string,
  page: number,
  sortingOrder: string
) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}&sort_by=${sortingOrder}`
    );
    return {
      results: res.data.results,
      totalPages: res.data.total_pages,
    };
  } catch (error) {
    console.log(error);
    return {
      results: [],
      totalPages: 0,
    };
  }
};
//
