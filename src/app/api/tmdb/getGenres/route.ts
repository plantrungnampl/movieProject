"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );
    return NextResponse.json(response.data.genres, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json([], { status: 500 });
  }
}
