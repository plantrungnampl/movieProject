"use server";
import { db } from "@/service/firebase";
import axios from "axios";

import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { revalidateTag } from "next/cache";
// get user data form firebase data (firestore)
export async function getSerVerData(userId: string) {
  try {
    const snapshot = await getDocs(
      collection(db, "users", userId.toString(), "watchlist")
    );
    const data = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
    }));
    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
// get data today and this week
// fetchData.js

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchData() {
  const trendingWeek = await axios.get(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
  );
  const trendingDay = await axios.get(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  );
  const [trendingWeeks, trendingDays] = await Promise.all([
    trendingWeek.data,
    trendingDay.data,
  ]);

  if (trendingWeek.status !== 200 || trendingDay.status !== 200) {
    throw new Error(
      trendingWeek.statusText ||
        trendingDay.statusText ||
        "Failed to fetch data"
    );
  }

  const day = trendingDays.results;
  const week = trendingWeeks.results;
  const tabData = [
    { value: "Today", result: day },
    { value: "Thisweek", result: week },
  ];

  return tabData;
}

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
// export const fetchAllData = async () => {
//   try {
//     const getInthreatMovie = await axios.get(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
//       {
//         timeout: 3000,
//       }
//     );
//     const getLatestTrailers = await axios.get(
//       `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
//       {
//         timeout: 3000,
//       }
//     );
//     const [inThreatMovie, latestTrailers] = await Promise.all([
//       getInthreatMovie.data,
//       getLatestTrailers.data,
//     ]);
//     if (getInthreatMovie.status !== 200 || getLatestTrailers.status !== 200) {
//       throw new Error("Failed to fetch data");
//     }
//     const Popular = latestTrailers.results;
//     const ThreatMovie = inThreatMovie.results;
//     const tabData = [
//       { value: "Popular", result: Popular },
//       { value: "In theaters", result: ThreatMovie },
//     ];
//     return tabData;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getVideoDetails = async (id: string | number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return [];
  }
};

export const getInTheatersMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching in theaters movies:", error);
    return [];
  }
};

export const getLatestTrailers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching latest trailers:", error);
    return [];
  }
};
