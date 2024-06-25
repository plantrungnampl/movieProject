"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export interface peopleResponse {
  results: any[];
  totalPages: number;
}
export async function GET(
  request: NextRequest
): Promise<NextResponse<peopleResponse>> {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  try {
    const response = await axios.get(
      `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data: peopleResponse = {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    const errorData: peopleResponse = { results: [], totalPages: 0 };
    return NextResponse.json(errorData, { status: 500 });
  }
}
