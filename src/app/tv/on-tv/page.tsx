"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/constants";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
const OnTvs = dynamic(() => import("@/components/OnTv/OnTvs"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
export default function OnTv() {
  const [loading, setLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);
  const [sortOrder, setSortOrder] = React.useState("name.asc");
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results.length) return null; // reached the end
    if (isFiltering) {
      return `/api/tmdb/getOnAirTvByGenre?page=${
        pageIndex + 1
      }&sortOrder=${sortOrder}&genreIds=${selectedGenre.join(",")}`;
    } else {
      return `/api/tmdb/getOnAirTv?page=${pageIndex + 1}`;
    }
  };
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      parallel: true,
      revalidateFirstPage: false,
    }
  );
  useEffect(() => {
    if (data) {
      const newData = [].concat(...data.map((el) => el.results));
      setFilteredMovies(newData);
      if (data[0]?.totalPages) {
        setTotalPage(data[0]?.totalPages);
      }
    }
  }, [data]);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < 20);
  const handleSubmitFilter = () => {
    setLoading(true);
    setIsFiltering(true);
    setSize(1);
    setLoading(false);
  };

  const handleSort = async (order: string) => {
    setLoading(true);
    try {
      setSortOrder(order);
      setIsFiltering(true);
      setSize(1);
      mutate();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3 h-fit ">
            <Filter
              // filteredMovies={filteredMovies}
              // setFilteredMovies={setFilteredMovies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              handleSubmitFilter={handleSubmitFilter}
              handleSort={handleSort}
              setIsFilterGenres={setIsFiltering}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <React.Suspense fallback={<div>Loading....</div>}>
              <OnTvs onTv={filteredMovies} />
            </React.Suspense>
            <div className="w-full">
              <div className="text-center mt-4  ">
                {!isReachingEnd && (
                  <Button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                    className="w-full p-4 rounded-lg mx-auto text-center"
                  >
                    {isLoadingMore ? "Loading..." : "Load More"}
                  </Button>
                )}
                {isReachingEnd && <p>No more movies</p>}
                <p>Total Pages: {totalPage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
