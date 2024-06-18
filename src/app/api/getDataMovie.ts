"use server";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";

const API_KEY = process.env.API_KEY;
interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  // Fetch movie data
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
  );
  const movie = res.data;
  // console.log(movie);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: movie.title,
    description: movie.overview,
    keywords:
      movie.keywords?.keywords.map((kw: any) => kw.name).join(", ") || "",
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [
        movie.images?.posters?.[0]?.file_path
          ? `https://image.tmdb.org/t/p/original${movie.images.posters[0].file_path}`
          : "",
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.overview,
      images: movie.images?.posters?.[0]?.file_path
        ? `https://image.tmdb.org/t/p/original${movie.images.posters[0].file_path}`
        : "",
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Movie",
        name: movie.title,
        image: movie.images?.posters?.[0]?.file_path
          ? `https://image.tmdb.org/t/p/original${movie.images.posters[0].file_path}`
          : "",
        description: movie.overview,
        director: movie.credits?.crew
          ?.filter((crew: any) => crew.job === "Director")
          .map((director: any) => director.name)
          .join(", "),
        actor: movie.credits?.cast?.map((actor: any) => actor.name).join(", "),
        datePublished: movie.release_date,
        genre: movie.genres?.map((genre: any) => genre.name).join(", "),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average,
          ratingCount: movie.vote_count,
        },
      }),
    },
  };
}
export async function getDataMovieServer(id: string) {
  if (!id) {
    return { error: "ID is missing" };
  }

  try {
    const resMovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images,keywords,release_dates,translations`
    );

    const data = resMovie.data;
    return data;
  } catch (error: any) {
    console.error("Fetching error: ", error.message);
    return { error: error.message };
  }
}
