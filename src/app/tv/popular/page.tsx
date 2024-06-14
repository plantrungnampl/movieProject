"use client";
import { getTvByGenre } from "@/app/api/fetchFIlter";
import { getDataTopRate } from "@/app/api/getDataTopRate";
import Filter from "@/components/Filters/Filter";
import TopRateMovies from "@/components/TopRateMovie/TopRateMovies";
import { Button } from "@/components/ui/button";
import { TopRateMovieProps } from "@/model/topRate";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
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
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = isFiltering
        ? await getTvByGenre(selectedGenre.join(","), currentPage + 1)
        : await getDataTopRate(currentPage + 1);
      // setCurrentPage(currentPage + 1);
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
        const data = await getDataTopRate(1);
        setTotalPage(data?.totalPages); // fech pagination
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
      // setCurrentPage(1);
      const tv = await getTvByGenre(selectedGenre.join(","), 1);
      setFilteredMovies(tv.results);
      setTotalPage(tv.totalPages);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
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
          <div className="shadow-lg p-3 w-1/3 ">
            <Filter
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              setIsFiltering={setIsFiltering}
              handleSubmitFilter={handleSubmitFilter}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRateMovies topRates={filteredMovies} />
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
