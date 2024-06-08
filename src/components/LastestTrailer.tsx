"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Loading from "@/app/loading";

import { fetchAllData, getVideoDetails } from "@/app/api/fetchData";
import dynamic from "next/dynamic";
// import LatestTrailerItem from './LatestTrailerItem';
const LatestTrailerItem = dynamic(
  () => import("@/components/LatestTrailerItem"),
  {
    suspense: true,
  }
);
const LastestTrailer = () => {
  const [videos, setVideos] = useState<any[] | any>([]);
  const [activeTab, setActiveTab] = useState("Popular");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tabData = await fetchAllData();

      setLoading(true);
      const selectedTabData =
        tabData?.find((tab) => tab.value === activeTab)?.result || [];

      const movieDetails = await Promise.all(
        selectedTabData.map(async (item: any) => {
          const details = await getVideoDetails(item.id);
          const trailer = details.find(
            (video: any) => video.type === "Trailer"
          );
          return {
            ...item,
            videoKey: trailer ? trailer.key : null,
          };
        })
      );

      setVideos(movieDetails);
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);
  return (
    <div>
      <Tabs
        defaultValue="Popular"
        onValueChange={(value: any) => setActiveTab(value)}
      >
        <div className="flex gap-5 items-center mb-3">
          <p className="text-xl p-1 rounded">Latest Trailers</p>
          <TabsList>
            <TabsTrigger value="Popular">Popular</TabsTrigger>
            <TabsTrigger value="In theaters">In theaters</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Popular">
          {loading ? (
            <Loading />
          ) : (
            activeTab === "Popular" && <LatestTrailerItem videos={videos} />
          )}
        </TabsContent>
        <TabsContent value="In theaters">
          {loading ? (
            <Loading />
          ) : (
            activeTab === "In theaters" && <LatestTrailerItem videos={videos} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LastestTrailer;
