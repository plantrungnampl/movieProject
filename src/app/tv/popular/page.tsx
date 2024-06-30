"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/constants";
import { TopRateMovieProps } from "@/model/topRate";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

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
  const [loading, setLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState<any[]>([]);
  const [sortOrder, setSortOrder] = React.useState("popularity.desc");

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results.length) return null; // reached the end
    if (isFiltering) {
      return `/api/tmdb/getTvShowPopularByGenre?page=${
        pageIndex + 1
      }&sort_by=${sortOrder}&with_genres=${selectedGenre.join(",")}`;
    } else {
      return `/api/tmdb/tvShowPopular?page=${pageIndex + 1}`;
    }
  };

  const {
    data: Popular,
    error: fetchError,
    isLoading,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, fetcher, {
    parallel: true,
    revalidateFirstPage: false,
  });
  useEffect(() => {
    if (Popular) {
      setLoading(false);
      const newData = [].concat(...Popular.map((el) => el.results));
      setFilteredMovies(newData);
      if (Popular[0]?.totalPages) {
        setTotalPage(Popular[0]?.totalPages);
      }
    }
  }, [Popular]);

  const handleSubmitFilter = async () => {
    setLoading(true);
    setIsFiltering(true);
    setSize(1);
    mutate(); // Refresh data
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
    setLoading(true);
    setIsFiltering(true);
    setSize(1);
    mutate(); // Refresh data
  };

  const isLoadingMore =
    isLoading ||
    (size > 0 && Popular && typeof Popular[size - 1] === "undefined");
  const isEmpty = Popular?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (Popular && Popular[Popular.length - 1]?.results.length < 20);
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3 h-fit">
            <Filter
              // filteredMovies={filteredMovies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              handleSubmitFilter={handleSubmitFilter}
              handleSort={handleSort}
              setIsFilterGenres={setIsFiltering}
            />
          </div>

          <div className="w-full flex flex-wrap">
            <TopRateMovies PopularTv={filteredMovies} />
            <div className="w-full text-center mt-4">
              {!isReachingEnd && (
                <Button
                  disabled={isLoadingMore || isReachingEnd}
                  onClick={() => setSize(size + 1)}
                  className="w-full p-4 rounded-lg mx-auto text-center"
                >
                  {isLoadingMore ? "Loading..." : `Load More`}
                </Button>
              )}
              {isReachingEnd && <p>No more movies </p>}
              <p>Total Pages: {totalPage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
