"use client";
import { getOnAirTv, getOnAirTvByGenre } from "@/app/api/tvShows/fetchOnAir";
import Loading from "@/app/loading";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const OnTvs = dynamic(() => import("@/components/OnTv/OnTvs"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
export default function OnTv() {
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);
  const [sortOrder, setSortOrder] = React.useState("name.esc");
  useEffect(() => {
    const fetchDataOnTv = async () => {
      const data = await getOnAirTv(1);
      setFilteredMovies(data?.results);
      setTotalPage(data?.totalPages);
      setCurrentPage(1);
    };
    fetchDataOnTv();
  }, []);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = isFiltering
        ? await getOnAirTvByGenre(
            selectedGenre.toString(),
            currentPage + 1,
            sortOrder
          )
        : await getOnAirTv(currentPage + 1);
      setCurrentPage(currentPage + 1);
      setTotalPage(data.totalPages);
      setFilteredMovies([...filteredMovies, ...data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFiltering(true);
      const data = await getOnAirTvByGenre(
        selectedGenre.join(","),
        1,
        sortOrder
      );
      setCurrentPage(1);
      setFilteredMovies(data.results);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSort = async (order: string) => {
  //   setSortOrder(order);
  // };
  const handleSort = async (order: string) => {
    try {
      setLoading(true);
      setSortOrder(order);
      setCurrentPage(1);
      setIsFiltering(true);
      const data = await getOnAirTvByGenre("", 1, order);

      setFilteredMovies(data?.results);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          <div className="shadow-lg p-3 w-1/3 ">
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
            <OnTvs onTv={filteredMovies} />
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
