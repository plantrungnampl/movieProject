"use server";

import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
interface onAirTv {
  results: any[];
  totalPages: number;
}
export const getOnAirTv = async (page: number): Promise<onAirTv> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`
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

export const getOnAirTvByGenre = async (
  genreIds: number | string,
  page: number,
  sortOrder: string
) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreIds}&air_date.lte=${today}&air_date.gte=${today}&sort_by=${sortOrder}`
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
