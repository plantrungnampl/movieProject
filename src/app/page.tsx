import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense, useEffect } from "react";
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
  // const [Data, setData] = React.useState<any[]>([]);
  // const [tabData, setTabData] = React.useState<any[] | string>("Today");
  const Data = await fetchData();
  // useEffect(() => {
  //   const fetchDataHome = async () => {
  //     try {
  //       const data = await fetchData();
  //       setData(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchDataHome();
  // }, []);

  return (
    <>
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
              <div className="">
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
