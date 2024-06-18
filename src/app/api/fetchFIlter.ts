import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return response.data.genres;
};

export const getTvByGenre = async (
  genreId: number | string,
  page: number,
  sortOder: string
) => {
  const response = await axios.get(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}&include_null_first_air_dates=false&include_adult=false&sort_by=${sortOder}`
  );
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};
