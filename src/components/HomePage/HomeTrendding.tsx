"use client";
import Loading from "@/app/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { Skeleton } from "../SkeletonLoading/Skeleton";
import { LoadingSkeleton } from "../SkeletonLoading/SkeletonLoading";
import { LoadingSkeletonCard } from "./LoadingSkeletonCard";
const CarouselItemComponent = dynamic(
  () => import("@/components/CarouselItemComponent"),
  {
    ssr: false,
    loading: () => <LoadingSkeletonCard />,
  }
);

export default function HomeTrendding({
  data,
  isLoading,
}: {
  data: any[];
  isLoading: boolean;
}) {
  return (
    <>
      <div>
        <div>
          <Tabs defaultValue="Today">
            {/* map tap */}
            <div className="flex gap-5 items-center mb-3 ">
              <p className="text-xl p-1 rounded">Trending</p>
              <TabsList>
                {data.map((tab: any) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.value}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {/* map data */}

            <div>
              {data.map((tab: any) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <div className="">
                    <div className="flex gap-4 overflow-x-auto overflow-y-hidden  max-w-screen-xl custom-scrollbar snap-x ">
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
            </div>
          </Tabs>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
          width: 20%;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}
