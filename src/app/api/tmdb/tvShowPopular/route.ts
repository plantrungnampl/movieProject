"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";
interface toprateResponse {
  results: any[];
  totalPages: number;
}
export async function GET(
  request: Request
): Promise<NextResponse<toprateResponse>> {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data: toprateResponse = {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("failed to get data ", err);
    return NextResponse.json({ results: [], totalPages: 0 }, { status: 500 });
  }
}
