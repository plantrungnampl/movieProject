import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";

// export const fetchSearchCollections = async (
//   result: string,
//   searchValue: string
// ) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/search/${result}?api_key=${API_KEY}&query=${searchValue}&include_adult=false&language=en-US&page=1`
//     );
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
