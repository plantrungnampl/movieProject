"use server";

import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
export const trailerMovieServer = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
