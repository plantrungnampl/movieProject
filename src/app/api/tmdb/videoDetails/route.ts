"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json([], { status: 400 });
  }
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return NextResponse.json(response.data.results, { status: 200 });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return NextResponse.json([], { status: 500 });
  }
}
