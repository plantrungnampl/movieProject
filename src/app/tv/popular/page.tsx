"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/constants";
import { TopRateMovieProps } from "@/model/topRate";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";
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
  // const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOder, setSortOrder] = React.useState("popularity.desc");
  // const { data: Popular, error: fetchError } = useSWR(
  //   `/api/tmdb/tvShowPopular?page=1`,
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     refreshInterval: 10000,
  //   }
  // );
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    if (isFiltering) {
      return `/api/tmdb/getTvShowPopularByGenre?page=${
        pageIndex + 1
      }&sort_by=${sortOder}&with_genres=${selectedGenre.join(",")}`;
    } else if (!isFiltering) {
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
  const totalPagess = Popular && Popular[0] ? Popular[0].totalPages : 0;
  useEffect(() => {
    if (Popular && !isFiltering) {
      setLoading(false);
      const newData = [].concat(...Popular.map((el) => el.results));
      setFilteredMovies(newData);
      // setTotalPage(Popular[0]?.totalPages || 0);
    }
  }, [Popular, isFiltering]);
  // const totalPagess = Popular && Popular[0] ? Popular[0].totalPages : 0;
  // const handleLoadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const res = isFiltering
  //       ? await fetch(
  //           `/api/tmdb/getTvShowPopularByGenre?page=${
  //             currentPage + 1
  //           }&sort_by=${sortOder}&with_genres=${selectedGenre.join(",")}`
  //         )
  //       : await fetch(`/api/tmdb/tvShowPopular?page=${currentPage + 1}`);
  //     const data = await res.json();
  //     setCurrentPage((prev) => prev + 1);
  //     // setCurrentPage(currentPage + 1);
  //     setFilteredMovies((prev: any) => [...prev, ...data.results]);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const isLoadingMore =
    isLoading ||
    (size > 0 && Popular && typeof Popular[size - 1] === "undefined");
  // };
  const isEmpty = Popular?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (Popular && Popular[Popular.length - 1]?.length < totalPagess);
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFiltering(true);

      const res = await fetch(
        `/api/tmdb/getTvShowPopularByGenre?page=1&sortOder=${sortOder}&genreId=${selectedGenre.join(
          ","
        )}`
      );
      const tv = await res.json();
      setFilteredMovies(tv.results);
      setTotalPage(totalPagess);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (order: string) => {
    // try {
    //   setLoading(true);
    //   setCurrentPage(1);
    //   setIsFiltering(true);
    //   const res = await fetch(
    //     `/api/tmdb/getTvShowPopularByGenre?page=${currentPage}&sort_by=${sortOder}&with_genres=${selectedGenre.join(
    //       ","
    //     )}`
    //   );
    //   const data = await res.json();
    //   setSortOrder(order);
    //   setFilteredMovies(data?.results);
    //   setTotalPage(data?.totalPages);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3  h-fit  ">
            <Filter
              // filteredMovies={filteredMovies}
              filteredMovies={filteredMovies}
              // setFilteredMovies={setFilteredMovies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              handleSubmitFilter={handleSubmitFilter}
              handleSort={handleSort}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRateMovies PopularTv={filteredMovies} />
            {/* <TopRateMovies PopularTv={filteredMovies} /> */}
            <div className="w-full">
              <div className="text-center mt-4  ">
                {size < totalPagess && (
                  <div className="w-full text-center mt-4">
                    {/* <Button
                      onClick={handleLoadMore}
                      className="w-full p-4 rounded-lg mx-auto text-center"
                      disabled={isValidating}
                    >
                      {isValidating ? "Loading..." : "Load More"}
                    </Button> */}
                    <Button
                      disabled={isLoadingMore || isReachingEnd}
                      onClick={() => setSize(size + 1)}
                      className="w-full p-4 rounded-lg mx-auto text-center"
                    >
                      {isLoadingMore
                        ? "loading..."
                        : isReachingEnd
                        ? "no more movies"
                        : "load more"}
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
