"use server";
const API_KEY = process.env.API_KEY;
export async function getDataMovieTv(id: string) {
  if (!id) {
    return { error: "ID is missing" };
  }

  try {
    const resTv = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
    );

    if (!resTv.ok) {
      if (resTv.status === 404) {
        throw new Error("404 Not Found");
      } else {
        throw new Error(`HTTP error! status: ${resTv.status}`);
      }
    }
    const data = resTv.json();
    return data;
  } catch (error: any) {
    console.error("Fetching error: ", error.message);
    return { error: error.message };
  }
}
