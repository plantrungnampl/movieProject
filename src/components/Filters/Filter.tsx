"use client";
import { getGenres, getTvByGenre } from "@/app/api/fetchFIlter";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
export default function Filter({
  setFilteredMovies,
  filteredMovies,
}: {
  setFilteredMovies: any;
  filteredMovies: any;
}) {
  const [genres, setGenres] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState<any[]>([]);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [selectedOrder, setSelectedOrder] = React.useState("asc");
  // fetch genres
  React.useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);
  //  get movies data TV by genre
  // React.useEffect(() => {
  //   if (selectedGenre) {
  //     const fetchMovies = async () => {
  //       const movies = await getTvByGenre(selectedGenre);
  //       setFilteredMovies(movies);
  //     };
  //     fetchMovies();
  //   }
  // }, [selectedGenre, setFilteredMovies]);
  const handleChange = (genId: string | number) => {
    if (selectedGenre.includes(genId)) {
      setSelectedGenre(selectedGenre.filter((item: any) => item !== genId));
    } else {
      setSelectedGenre([...selectedGenre, genId]);
    }
  };
  const handleSubmitFilter = async () => {
    try {
      if (selectedGenre.length > 0) {
        const selectIdGenre = selectedGenre.join(",");
        const movies = await getTvByGenre(selectIdGenre);
        setFilteredMovies(movies);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSort = (order: any) => {
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(order);
    setFilteredMovies(sortedMovies);
    setSelectedOrder(order);
  };
  return (
    <>
      <div className="container flex flex-col gap-4">
        <div className="">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Genres</AccordionTrigger>
              {genres.map((genres: any) => (
                <AccordionContent key={genres.id}>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id={genres.id}
                      value={genres.id}
                      // checked={selectedGenre === genres.id}
                      checked={selectedGenre.includes(genres.id)}
                      // onChange={(e: any) => setSelectedGenre(e.target.value)}
                      onChange={(e: any) => handleChange(e.target.value)}
                    />
                    <Label htmlFor={genres.id}>{genres.name}</Label>
                  </div>
                </AccordionContent>
              ))}
            </AccordionItem>
            {selectedGenre.length > 0 && (
              <Button onClick={handleSubmitFilter}>Submit</Button>
            )}
          </Accordion>
        </div>
        <div className="sort-section">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Sort</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="asc"
                    value="asc"
                    onChange={(e: any) => handleSort(e.target.value)}
                    checked={selectedOrder === "asc"}
                  />
                  <Label htmlFor="asc">A-Z</Label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="desc"
                    value="desc"
                    onChange={(e: any) => handleSort(e.target.value)}
                    checked={selectedOrder === "desc"}
                  />
                  <Label htmlFor="desc">Z-A</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
