"use server";

import { API_KEY, BASE_URL } from "@/lib/constants";
import { responseData } from "@/model/responseData";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<responseData>> {
  const { searchParams } = new URL(req.url);
  const result = searchParams.get("result");
  const searchValue = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  // if (!result || !searchValue) {
  //   return NextResponse.json({ results: [], totalPages: 0 }, { status: 400 });
  // }
  try {
    const response = await axios.get(
      `${BASE_URL}/search/${result}?api_key=${API_KEY}&query=${searchValue}&include_adult=false&language=en-US&page=${page}`
    );
    const data: responseData = {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ results: [], totalPages: 0 }, { status: 500 });
  }
}
