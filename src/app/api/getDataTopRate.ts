"use server";
import axios from "axios";
const API_KEY = process.env.API_KEY;
export async function getDataTopRate() {
  try {
    const [responseTvTopRate, responseMovieTopRate] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
    ]);

    if (
      responseTvTopRate.status !== 200 ||
      responseMovieTopRate.status !== 200
    ) {
      throw new Error("Failed to fetch data");
    }

    const tvTopRate = responseTvTopRate.data.results;
    const movieTopRate = responseMovieTopRate.data.results;

    return { tvTopRate, movieTopRate };
  } catch (err) {
    console.error("failed to get data ", err);
  }
}
