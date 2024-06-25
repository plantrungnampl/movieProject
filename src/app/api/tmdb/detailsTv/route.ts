"use server";
import { API_KEY, BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return { error: "ID is missing" };
  }

  try {
    const resTv = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
    );

    return NextResponse.json(resTv.data, { status: 200 });
  } catch (error: any) {
    console.error("Fetching error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
