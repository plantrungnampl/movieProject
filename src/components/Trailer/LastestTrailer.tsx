"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Loading from "@/app/loading";

import {
  getInTheatersMovies,
  getLatestTrailers,
  getVideoDetails,
} from "@/app/api/fetchData";
import dynamic from "next/dynamic";
const LatestTrailerItem = dynamic(
  () => import("@/components/Trailer/LatestTrailerItem"),
  {
    suspense: true,
  }
);
// 1.create []
//2 fetch 2 API latest and now playing movies in []
//3create const variabale  use promise.all wait for both to finish and create new const variable get videoDetails
//4 get Video key from videoDetails

const LastestTrailer = () => {
  const [videos, setVideos] = useState<any[] | any>([]);
  const [activeTab, setActiveTab] = useState("Popular");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let trailerLatest: any[] = [];
      switch (activeTab) {
        case "Popular":
          trailerLatest = await getLatestTrailers();
          break;
        case "In theaters":
          trailerLatest = await getInTheatersMovies();
          break;

        default:
          break;
      }
      const movieDetails = await Promise.all(
        trailerLatest.map(async (item) => {
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
        onValueChange={(value: string) => setActiveTab(value)}
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
            <Loading number={20} />
          ) : (
            activeTab === "Popular" && <LatestTrailerItem videos={videos} />
          )}
        </TabsContent>
        <TabsContent value="In theaters">
          {loading ? (
            <Loading number={20} />
          ) : (
            activeTab === "In theaters" && <LatestTrailerItem videos={videos} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LastestTrailer;
