"use server";

import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const trailerMovieServer = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
