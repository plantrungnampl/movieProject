import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Sử dụng NEXT_PUBLIC prefix để biến môi trường có thể truy cập được từ client-side

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
