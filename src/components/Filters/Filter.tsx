"use client";
import { getGenres, getTvByGenre } from "@/app/api/fetchFIlter";
import React from "react";
import { Button } from "../ui/button";

export default function Filter({
  setMovies,
  movies,
}: {
  setMovies: any;
  movies: any;
}) {
  const [genres, setGenres] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [selectedOrder, setSelectedOrder] = React.useState("asc");
  React.useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  React.useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        const movies = await getTvByGenre(selectedGenre);
        setMovies(movies);
      };
      fetchMovies();
    }
  }, [selectedGenre, setMovies]);
  const handleSort = (order: any) => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(order);
    setMovies(sortedMovies);
    setSelectedOrder(order);
  };
  return (
    <>
      <div className="container flex flex-col gap-4">
        <div className="filter-section">
          <h2>The loai</h2>

          <select
            onChange={(e: any) => setSelectedGenre(e.target.value)}
            className="genre-select"
          >
            <option value="">Tất cả</option>
            {genres.map((genre: any) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-section">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleSort(e.target.value)
            }
            value={selectedOrder}
          >
            <option value="asc">Sắp xếp từ A-Z</option>
            <option value="desc">Sắp xếp từ Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
}
