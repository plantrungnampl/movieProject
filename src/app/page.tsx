// "use client";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import axios from "axios";
// import { Suspense, useState } from "react";
// import Loading from "./loading";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CarouselItemComponent from "@/components/CarouselItemComponent";
// import { fetchData } from "./api/fetchData";

// const API_KEY = process.env.API_KEY;

// async function Home() {
//   // const res1 = await axios.get(
//   //   `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
//   // );
//   // const res2 = await axios.get(
//   //   `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
//   // );
//   // const [data1, data2] = await Promise.all([res2.data, res1.data]);

//   // if (res1.status !== 200 || res2.status !== 200) {
//   //   throw new Error(data1.message || data2.message || "Failed to fetch data");
//   // }

//   // const result1 = data1.results;
//   // const result2 = data2.results;
//   // const tabData = [
//   //   { value: "Today", result: result1 },
//   //   { value: "Thisweek", result: result2 },
//   // ];
//   const tabData = await fetchData();
//   return (
//     <>
//       {/* <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 "> */}
//       <div>
//         <Suspense fallback={<Loading />}>
//           <Tabs defaultValue="Today">
//             {/* map tap */}
//             <div className="flex gap-5 items-center mb-3">
//               <p className="text-xl p-1 rounded">Trending</p>
//               <TabsList>
//                 {tabData.map((tab) => (
//                   <TabsTrigger key={tab.value} value={tab.value}>
//                     {tab.value}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </div>
//             {/* map data */}
//             {tabData.map((tab) => (
//               <TabsContent key={tab.value} value={tab.value}>
//                 <div>
//                   <div className="flex gap-4 overflow-x-auto overflow-y-hidden  max-w-screen-xl snap-x transition-colors  ">
//                     {tab.result.map((item: any) => (
//                       <div
//                         key={item.id}
//                         className="flex-shrink-0 snap-center w-fit "
//                       >
//                         <CarouselItemComponent item={item} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </TabsContent>
//             ))}
//           </Tabs>
//         </Suspense>
//       </div>
//       {/* </MaxWidthWrapper> */}
//     </>
//   );
// }

// function LastestTrailer() {
//   return (
//     <>
//       <div>
//         <div>
//           <h1>Lastest Trailer</h1>
//         </div>
//       </div>
//     </>
//   );
// }
// function HomePageWrapper() {
//   return (
//     <>
//       <Suspense fallback={<Loading />}>
//         <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
//           <div>
//             <Home />
//             <div className="mt-14">
//               <LastestTrailer />
//             </div>
//           </div>
//         </MaxWidthWrapper>
//       </Suspense>
//     </>
//   );
// }
// export default HomePageWrapper;
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchData } from "./api/fetchData";
import { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: "Home ",
  description: "This is a movies project for eductional purposes",
};
const CarouselItemComponent = dynamic(
  () => import("@/components/CarouselItemComponent"),
  {
    suspense: true,
  }
);
const LastestTrailer = dynamic(() => import("@/components/LastestTrailer"), {
  suspense: true,
});

async function Home() {
  const Data = await fetchData();

  return (
    <>
      {/* <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 "> */}
      <div>
        <Tabs defaultValue="Today">
          {/* map tap */}
          <div className="flex gap-5 items-center mb-3">
            <p className="text-xl p-1 rounded">Trending</p>
            <TabsList>
              {Data.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.value}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* map data */}
          {Data.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div>
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden  max-w-screen-xl snap-x transition-colors  ">
                  {tab.result.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 snap-center w-fit flex "
                    >
                      <CarouselItemComponent item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* </MaxWidthWrapper> */}
    </>
  );
}

function HomePageWrapper() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
          <div>
            <Home />
            <div className="mt-14">
              <Suspense fallback={<Loading />}>
                <LastestTrailer />
              </Suspense>
            </div>
          </div>
        </MaxWidthWrapper>
      </Suspense>
    </>
  );
}

export default HomePageWrapper;
