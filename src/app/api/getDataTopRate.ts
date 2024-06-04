import axios from "axios";

export async function getDataTopRate() {
  try {
    const response = await axios.get(``);
    return response.data;
  } catch (err) {
    console.error("failed to get data ", err);
  }
}
