"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return NextResponse.json(response.data.results, { status: 200 });
  } catch (error) {
    console.error("Error fetching in theaters movies:", error);
    return NextResponse.json([], { status: 500 });
  }
}
