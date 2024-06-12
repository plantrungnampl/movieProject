// "use server";
// import axios from "axios";

// const API_KEY = "c5ab3bfedd4a0825d5615ef3255ac660";
// const api_url = "https://api.themoviedb.org/3";
// interface peopleResponse {
//   results: any[];
//   totalPages: number;
// }
// export const fetchPeople = async (page: number): Promise<peopleResponse> => {
//   try {
//     const response = await axios.get(
//       `${api_url}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     // const data = response.data.results;
//     return {
//       results: response.data.results,
//       totalPages: response.data.total_pages,
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };
"use server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = "c5ab3bfedd4a0825d5615ef3255ac660";
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
