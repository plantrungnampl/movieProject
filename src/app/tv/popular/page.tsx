"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import { TopRateMovieProps } from "@/model/topRate";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const TopRateMovies = dynamic(
  () => import("@/components/PopularTvSeri/PopularTvSeris"),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  }
);
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
export default function TopRate() {
  const [filteredMovies, setFilteredMovies] = React.useState<
    TopRateMovieProps[]
  >([]);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOder, setSortOrder] = React.useState("popularity.desc");
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const res = isFiltering
        ? await fetch(
            `/api/tmdb/getTvShowPopularByGenre?page=${
              currentPage + 1
            }&sort_by=${sortOder}&with_genres=${selectedGenre.join(",")}`
          )
        : await fetch(`/api/tmdb/tvShowPopular?page=${currentPage + 1}`);
      const data = await res.json();
      setCurrentPage((prev) => prev + 1);
      setFilteredMovies((prev: any) => [...prev, ...data.results]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getTopRate() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tmdb/tvShowPopular?page=1`);
        const data = await res.json();
        // fech pagination
        setTotalPage(data?.totalPages);
        setFilteredMovies(data?.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getTopRate();
  }, []);

  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFiltering(true);
      setCurrentPage(1);
      const res = await fetch(
        `/api/tmdb/getTvShowPopularByGenre?page=1&sortOder=${sortOder}&genreId=${selectedGenre.join(
          ","
        )}`
      );
      const tv = await res.json();
      setFilteredMovies(tv.results);
      setTotalPage(tv.totalPages);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSort = async (order: string) => {
    try {
      setLoading(true);
      setCurrentPage(1);
      setIsFiltering(true);
      const res = await fetch(
        `/api/tmdb/getTvShowPopularByGenre?page=${currentPage}&sort_by=${sortOder}&with_genres=${selectedGenre.join(
          ","
        )}`
      );
      const data = await res.json();
      setSortOrder(order);
      setFilteredMovies(data?.results);
      setTotalPage(data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3  h-fit  ">
            <Filter
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              handleSubmitFilter={handleSubmitFilter}
              handleSort={handleSort}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRateMovies PopularTv={filteredMovies} />
            <div className="w-full">
              <div className="text-center mt-4  ">
                {currentPage < totalPage && (
                  <div className="w-full text-center mt-4">
                    <Button
                      onClick={handleLoadMore}
                      className="w-full p-4 rounded-lg mx-auto text-center"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
