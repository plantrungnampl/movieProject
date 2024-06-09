import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      include_null_first_air_dates: false,
      include_adult: false,
    },
  });
  return response.data.genres;
};

export const getTvByGenre = async (genreId: number | string) => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 100,
      include_null_first_air_dates: false,
      include_adult: false,
      with_genres: genreId,
    },
  });
  return response.data.results;
};
