"use server";

import { API_KEY, BASE_URL } from "@/lib/constants";
import { responseData } from "@/model/responseData";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<responseData>> {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}&language=en-US`
    );

    const data: responseData = {
      results: res.data.results,
      totalPages: res.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ results: [], totalPages: 0 }, { status: 500 });
  }
}
