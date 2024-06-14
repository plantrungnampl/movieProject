"use client";
import { getGenres } from "@/app/api/fetchFIlter";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
export default function Filter({
  setFilteredMovies,
  filteredMovies,
  selectedGenre,
  setSelectedGenre,
  handleSubmitFilter,
}: {
  setFilteredMovies: any;
  filteredMovies: any;
  selectedGenre: any;
  setSelectedGenre: any;
  setIsFiltering: any;
  handleSubmitFilter: () => void;
}) {
  const [genres, setGenres] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [selectedOrder, setSelectedOrder] = React.useState("asc");
  const [loading, setLoading] = React.useState(false);

  // fetch genres
  React.useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);
  //  get data TV by genre

  const handleChange = (genId: string | number) => {
    if (selectedGenre.includes(genId)) {
      setSelectedGenre(selectedGenre.filter((item: any) => item !== genId));
    } else {
      setSelectedGenre([...selectedGenre, genId]);
    }
  };

  const handleSubmitFilters = async () => {
    setLoading(true);
    await handleSubmitFilter();
    setLoading(false);
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
              <div className="flex flex-wrap w-full h-auto gap-3 ">
                {genres.map((genres: any) => (
                  <AccordionContent key={genres.id}>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        value={genres.id}
                        id={genres.id}
                        onClick={() => handleChange(genres.id)}
                        className={
                          selectedGenre.includes(genres.id)
                            ? "bg-slate-700 text-white"
                            : ""
                        }
                      >
                        {genres.name}
                      </Button>
                    </div>
                  </AccordionContent>
                ))}
              </div>
            </AccordionItem>
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
        {selectedGenre.length > 0 && (
          <Button className="w-full" onClick={handleSubmitFilters}>
            Search
          </Button>
        )}
        {loading && (
          <div className="w-full flex justify-center mt-4">
            <span>Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
