"use server";
import axios from "axios";

const API_KEY = process.env.API_KEY;

export async function getDataMovieServer(id: string) {
  if (!id) {
    return { error: "ID is missing" };
  }

  try {
    const resMovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
    );

    const data = resMovie.data;
    return data;
  } catch (error: any) {
    console.error("Fetching error: ", error.message);
    return { error: error.message };
  }
}
