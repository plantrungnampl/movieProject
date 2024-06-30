import { API_KEY, BASE_URL } from "@/lib/constants";
import { responseData } from "@/model/responseData";
import axios from "axios";
import { NextResponse } from "next/server";
import { format, startOfDay } from "date-fns";
export async function GET(req: Request): Promise<NextResponse<responseData>> {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const sortOrder = searchParams.get("sortOrder") || "popularity.desc";
  const genreIds = searchParams.get("genreIds");
  try {
    const today = format(startOfDay(new Date()), "yyyy-MM-dd");
    const res = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreIds}&air_date.gte=${today}&sort_by=${sortOrder}`
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
