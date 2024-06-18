// import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = process.env.API_KEY;
// interface tvArringResponse {
//   results: any[];
//   totalPages: number;
// }
// export const getTvArring = async (page: number | string) => {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`
//     );

//     return {
//       results: res.data.results,
//       totalPages: res.data.total_pages,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getTvArringByGenre = async (
//   genreId: number | string,
//   page: number
// ): Promise<tvArringResponse> => {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}`
//     );
//     return {
//       results: res.data.results,
//       totalPages: res.data.total_pages,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       results: [],
//       totalPages: 0,
//     };
//   }
// };
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

interface tvArringResponse {
  results: any[];
  totalPages: number;
}

export const getTvArring = async (page: number | string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}&append_to_response=videos,images`
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

export const getTvArringByGenre = async (
  genreIds: string,
  page: number,
  sortOder: string
): Promise<tvArringResponse> => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreIds}&air_date.gte=${today}&air_date.lte=${today}&sort_by=${sortOder}`
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
