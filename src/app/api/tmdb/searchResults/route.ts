"use server";

import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("q");

  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
    );
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}
