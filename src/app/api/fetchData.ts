"use server";
import { db } from "@/service/firebase";
import axios from "axios";

import { doc, collection, getDoc, getDocs } from "firebase/firestore";
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

export async function fetchData() {
  const trendingWeek = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
  );
  const trendingDay = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  );
  // const [data1, data2] = await Promise.all([res2.data, res1.data]);
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
const BASE_URL = "https://api.themoviedb.org/3";

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
