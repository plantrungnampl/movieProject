import axios from "axios";

const API_KEY = "c5ab3bfedd4a0825d5615ef3255ac660";
const api_url = "https://api.themoviedb.org/3";

export const fetchPeople = async () => {
  try {
    const response = await axios.get(
      `${api_url}/person/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = response.data.results;
    return data;
  } catch (err) {
    console.log(err);
  }
};
