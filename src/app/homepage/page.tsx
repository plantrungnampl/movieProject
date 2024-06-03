import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import CarouselItemComponent from "./CarouselItemComponent";
import CarouselItemComponent from "@/components/CarouselItemComponent";
import Loading from "@/app/loading";

export interface IItem {
  id: number;
  movie_id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  title: string;
  first_air_date: string;
  backdrop_path: string;
  release_date: string;
  media_type: string;
}

export interface IResult {
  result: IItem[];
  result1: IItem[];
}
export default function HomePage({ result, result1 }: IResult) {
  const tabData = [
    { value: "Today", result: result1 },
    { value: "Thisweek", result: result },
  ];
  return (
    <Tabs defaultValue="Today">
      {/* map tap */}
      <div className="flex gap-5 items-center mb-3">
        <p className="text-xl p-1 rounded">Trending</p>
        <TabsList>
          {tabData.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.value}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {/* map data */}
      {tabData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Carousel>
            <CarouselContent className="grid grid-cols-auto-fit-minmax gap-4">
              {tab.result.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 flex"
                >
                  <CarouselItemComponent item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious>Previous</CarouselPrevious>
            <CarouselNext>Next</CarouselNext>
          </Carousel>
        </TabsContent>
      ))}
    </Tabs>
  );
}
