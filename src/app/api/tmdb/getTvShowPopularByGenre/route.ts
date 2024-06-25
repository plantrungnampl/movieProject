import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";
interface toprateResponse {
  results: any[];
  totalPages: number;
}
export async function GET(
  req: Request
): Promise<NextResponse<toprateResponse>> {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const sortOder = searchParams.get("sortOder") || "popularity.desc";
  const genreId = searchParams.get("genreId");
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}&sort_by=${sortOder}`
    );

    const data: toprateResponse = {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ results: [], totalPages: 0 }, { status: 500 });
  }
}
