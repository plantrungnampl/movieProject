import { API_KEY } from "@/lib/constants";
import axios from "axios";

export const fetchSearchResults = async (searchValue: string) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const fetchSearchCollections = async (
  result: any,
  searchValue: string
) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${result}?api_key=${API_KEY}&query=${searchValue}&include_adult=false&language=en-US&page=1`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
