"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is missing" }, { status: 400 });
  }

  try {
    const resMovie = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
    );

    return NextResponse.json(resMovie.data, { status: 200 });
  } catch (error: any) {
    console.error("Fetching error: ", error.message);
    return NextResponse.json({ error: "error " }, { status: 500 });
  }
}
