// import React, { Suspense, useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import CarouselItemComponent from "@/components/CarouselItemComponent";
// import { IItem } from "@/model/types";
// // import { IResult } from "@/model/types";

// interface IResult {
//   result: IItem[];
//   result1: IItem[];
// }

// export default function HomePage({ result, result1 }: IResult) {
//   const tabData = [
//     { value: "Today", result: result1 },
//     { value: "Thisweek", result: result },
//   ];
//   return (
//     <Tabs defaultValue="Today">
//       {/* map tap */}
//       <div className="flex gap-5 items-center mb-3">
//         <p className="text-xl p-1 rounded">Trending</p>
//         <TabsList>
//           {tabData.map((tab) => (
//             <TabsTrigger key={tab.value} value={tab.value}>
//               {tab.value}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </div>
//       {/* map data */}
//       {tabData.map((tab) => (
//         <TabsContent key={tab.value} value={tab.value}>
//           <Carousel>
//             <CarouselContent className="grid grid-cols-auto-fit-minmax gap-4">
//               {tab.result.map((item) => (
//                 <CarouselItem
//                   key={item.id}
//                   className="md:basis-1/2 lg:basis-1/3 flex"
//                 >
//                   <CarouselItemComponent item={item} />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious>Previous</CarouselPrevious>
//             <CarouselNext>Next</CarouselNext>
//           </Carousel>
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// }
import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselItemComponent from "@/components/CarouselItemComponent";
import { IItem } from "@/model/types";
import axios from "axios";
// import { IResult } from "@/model/types";

// interface IResult {
//   result: IItem[];
//   result1: IItem[];
// }
const API_KEY = process.env.API_KEY;
export default async function HomePage() {
  const res1 = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
  );
  const res2 = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  );
  const [data1, data2] = await Promise.all([res2.data, res1.data]);

  if (res1.status !== 200 || res2.status !== 200) {
    throw new Error(data1.message || data2.message || "Failed to fetch data");
  }

  const result1 = data1.results;
  const result2 = data2.results;
  const tabData = [
    { value: "Today", result: result1 },
    { value: "Thisweek", result: result2 },
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
