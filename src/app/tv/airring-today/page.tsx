"use client";
import {
  getTvArring,
  getTvArringByGenre,
} from "@/app/api/tvShows/getTvAirring";
import Loading from "@/app/loading";
// import Filter from "@/components/Filters/Filter";
// import TvArringTodays from "@/components/TvArringToday/TvArringTodays";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import React, { useEffect } from "react";
const TvArringTodays = dynamic(
  () => import("@/components/TvArringToday/TvArringTodays"),
  { ssr: false, loading: () => <Loading number={20} /> }
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
      const data = await getTvArring(1);
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
      const dataGenreFilter = await getTvArringByGenre(
        selectGenres.toString(),
        1,
        sortOder
      );
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
      const data = isFilteringGenre
        ? await getTvArringByGenre(
            selectGenres.toString(),
            currentPage + 1,
            sortOder
          )
        : await getTvArring(currentPage + 1);
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
      const data = await getTvArringByGenre("", 1, order);

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
          <h2>Arring Today</h2>
          <div className="flex">
            <div className="shadow-lg p-3 w-1/3 ">
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
