"use client";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Filter, TopRatedTv } from "./page";

export default function TopRated() {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [filterTopRated, setFilterTopRated] = useState<any[]>([]);
  const [selectGenres, setSelectedGenre] = useState<any[]>([]);
  const [isFilterGenres, setIsFilterGenres] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = React.useState("name.esc");
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results.length) return null; // reached the end
    if (isFilterGenres) {
      return `/api/tmdb/getTopRatedTvShowByGenre?page=${
        pageIndex + 1
      }&genreId=${selectGenres.join(",")}&sortingOrder=${sortOrder}`;
    } else {
      return `/api/tmdb/getTopRatedTvShow?page=${pageIndex + 1}`;
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
      setFilterTopRated(newData);
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
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFilterGenres(true);
      setSize(1);
      // mutate();
      setIsFilterGenres(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <h1>{error}</h1>;

  const handleSort = async (order: string) => {
    setLoading(true);
    try {
      setSortOrder(order);
      setIsFilterGenres(true);
      setSize(1);
      mutate();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(selectGenres);
  console.log(filterTopRated);
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3 h-fit ">
            <Filter
              filteredMovies={filterTopRated}
              selectedGenre={selectGenres}
              setSelectedGenre={setSelectedGenre}
              handleSubmitFilter={handleSubmitFilter}
              handleSort={handleSort}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRatedTv topRates={filterTopRated} />
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
