import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import { Suspense } from "react";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarouselItemComponent from "@/components/CarouselItemComponent";

const API_KEY = process.env.API_KEY;

async function Home() {
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
    <>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div>
          {/* <HomePage result={result2} result1={result1}></HomePage> */}
          <Suspense fallback={<Loading />}>
            {/* <HomePage /> */}
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
                      {tab.result.map((item: any) => (
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
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
function HomePageWrapper() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </>
  );
}
export default HomePageWrapper;
