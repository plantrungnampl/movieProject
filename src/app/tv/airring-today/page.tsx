"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import React, { useEffect } from "react";
const TvArringTodays = dynamic(
  () => import("@/components/TvArringToday/TvArringTodays"),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
export default function ArringToday() {
  const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectGenres, setSelectGenres] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isFilteringGenre, setIsFilteringGenre] = React.useState(false);
  const [sortOder, setSortOrder] = React.useState("name.asc");

  useEffect(() => {
    const fetchDataArringToday = async () => {
      const res = await fetch(`/api/tmdb/getTvArring?page=1`);

      const data = await res.json();
      setFilteredMovies(data?.results);
      setCurrentPage(1);
      setTotalPage(data?.totalPages);
    };
    fetchDataArringToday();
  }, []);
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFilteringGenre(true);
      setCurrentPage(1);
      const covertGenre = selectGenres.join(",");
      const res = await fetch(
        `/api/tmdb/getTvArringByGenre?page=1&sortOder=${sortOder}&genreId=${covertGenre}`
      );
      const dataGenreFilter = await res.json();
      setCurrentPage(1);
      setFilteredMovies(dataGenreFilter?.results);
      setTotalPage(dataGenreFilter?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const res = isFilteringGenre
        ? await fetch(
            `/api/tmdb/getTvArringByGenre?page=1&sortOder=${sortOder}&genreId=${selectGenres.toString()}`
          )
        : await fetch(`/api/tmdb/getTvArring?page=${currentPage + 1}`);
      const data = await res.json();
      setCurrentPage((pre) => pre + 1);
      setTotalPage(data?.totalPages);
      setFilteredMovies([...filteredMovies, ...data?.results]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSort = async (order: string) => {
    try {
      setLoading(true);
      setSortOrder(order);
      setCurrentPage(1);
      setIsFilteringGenre(true);
      // const data = await getTvArringByGenre("", 1, order);
      const res = await fetch(
        `/api/tmdb/getTvArringByGenre?page=1&sortOder=${sortOder}&genreId=${selectGenres.toString()} `
      );
      const data = await res.json();
      setFilteredMovies(data?.results);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div>
          <h2 className="font-bold text-2xl">Arring Today</h2>
          <div className="flex">
            <div className="shadow-lg p-3 w-1/3 h-fit ">
              <Filter
                setSelectedGenre={setSelectGenres}
                setFilteredMovies={setFilteredMovies}
                handleSubmitFilter={handleSubmitFilter}
                selectedGenre={selectGenres}
                filteredMovies={filteredMovies}
                handleSort={handleSort}
              />
            </div>
            <div className=" w-full flex flex-wrap">
              <TvArringTodays filteredMovies={filteredMovies} />
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
      </div>
    </>
  );
}
