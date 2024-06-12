"use server";
import axios from "axios";
const API_KEY = process.env.API_KEY;
const api_url = "https://api.themoviedb.org/3";
interface toprateResponse {
  results: any[];
  totalPages: number;
}
export async function getDataTopRate(page: any): Promise<toprateResponse> {
  try {
    const response = await axios.get(
      `${api_url}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (err) {
    console.error("failed to get data ", err);
    return {
      results: [],
      totalPages: 0,
    };
  }
}
