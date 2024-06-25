"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    const day = trendingDays.results;
    const week = trendingWeeks.results;
    const tabData = [
      { value: "Today", result: day },
      { value: "Thisweek", result: week },
    ];

    return NextResponse.json(tabData, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "failed to fetching data" },
      { status: 500 }
    );
  }
}
