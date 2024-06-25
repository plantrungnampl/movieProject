"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Filter({
  selectedGenre,
  setSelectedGenre,
  handleSubmitFilter,
  handleSort,
}: {
  setFilteredMovies: any;
  filteredMovies: any;
  selectedGenre: any;
  setSelectedGenre: any;
  handleSubmitFilter: () => void;
  handleSort: (order: string) => void;
}) {
  const [genres, setGenres] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("/api/tmdb/getGenres");
      const data = await res.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleChange = (genId: string | number) => {
    if (selectedGenre.includes(genId)) {
      setSelectedGenre(selectedGenre.filter((item: any) => item !== genId));
    } else {
      setSelectedGenre([...selectedGenre, genId]);
    }
  };
  const handleSortChange = (order: string) => {
    setSelectedOrder(order);
  };

  const handleSubmitFilters = async () => {
    try {
      setLoading(true);
      if (selectedGenre.length > 0 && selectedOrder) {
        handleSort(selectedOrder);
        handleSubmitFilter();
      } else if (selectedGenre.length > 0) {
        handleSubmitFilter();
      } else if (selectedOrder) {
        handleSort(selectedOrder);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
                        variant="outline"
                        onClick={() => handleChange(genres.id)}
                        className={
                          selectedGenre.includes(genres.id)
                            ? "bg-slate-500 text-white"
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
                <Select
                  onValueChange={handleSortChange}
                  // defaultValue={sortOrder}
                  defaultValue=""
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="name.asc">name A-Z</SelectItem>
                      <SelectItem value="name.desc">name Z-A</SelectItem>
                      <SelectItem value="popularity.desc">
                        Popularity Descending
                      </SelectItem>
                      <SelectItem value="popularity.asc">
                        Popularity Ascending
                      </SelectItem>
                      <SelectItem value="vote_average.desc">
                        Rating Descending
                      </SelectItem>
                      <SelectItem value="vote_average.asc">
                        Rating Ascending
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {(selectedGenre.length > 0 || selectedOrder) && (
          <Button
            className="w-full"
            onClick={handleSubmitFilters}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader mr-2"></div>
                Loading...
              </div>
            ) : (
              "Search"
            )}
          </Button>
        )}
      </div>
    </>
  );
}
