"use server";

import { API_KEY, BASE_URL } from "@/lib/constants";
import { responseData } from "@/model/responseData";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<responseData>> {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const genreId = searchParams.get("genreId");
  const sortingOrder = searchParams.get("sortingOrder") || "vote_average.desc";
  try {
    const res = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}&sort_by=${sortingOrder}`
    );

    const data: responseData = {
      results: res.data.results,
      totalPages: res.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ results: [], totalPages: 0 }, { status: 500 });
  }
}
