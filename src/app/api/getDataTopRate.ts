// "use server";
// import { API_KEY, BASE_URL } from "@/lib/constants";
// import axios from "axios";
// interface toprateResponse {
//   results: any[];
//   totalPages: number;
// }
// export async function getDataPopular(page: any): Promise<toprateResponse> {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     return {
//       results: response.data.results,
//       totalPages: response.data.total_pages,
//     };
//   } catch (err) {
//     console.error("failed to get data ", err);
//     return {
//       results: [],
//       totalPages: 0,
//     };
//   }
// }
