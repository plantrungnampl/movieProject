"use server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const api_url = "https://api.themoviedb.org/3";
interface peopleResponse {
  results: any[];
  totalPages: number;
}
export const fetchPeople = async (page: any): Promise<peopleResponse> => {
  try {
    const response = await axios.get(
      `${api_url}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (err) {
    console.log(err);
    return {
      results: [],
      totalPages: 0,
    };
  }
};
