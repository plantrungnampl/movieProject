"use client";
import {
  getInTheatersMovies,
  getPopularMovies,
  getVideoDetails,
} from "@/app/api/fetchData";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ReactPlayer from "react-player";
import Loading from "@/app/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/legacy/image";

const LastestTrailer = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Popular");
  const [loading, setLoading] = useState(false);
  const [popularVideosLoaded, setPopularVideosLoaded] = useState(false);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       let movieList = [];

  //       if (activeTab === "Popular") {
  //         movieList = await getPopularMovies();
  //       } else if (activeTab === "In Theaters") {
  //         movieList = await getInTheatersMovies();
  //       }

  //       const movieDetails = await Promise.all(
  //         movieList.map(async (item: any) => {
  //           const details = await getVideoDetails(item.id);
  //           const trailer = details.find(
  //             (video: any) => video.type === "Trailer"
  //           );
  //           return {
  //             ...item,
  //             videoKey: trailer ? trailer.key : null,
  //           };
  //         })
  //       );

  //       setVideos(movieDetails);
  //     };

  //     fetchData();
  //   }, [activeTab]);
  useEffect(() => {
    const fetchData = async () => {
      let movieList = [];
      setLoading(true);
      switch (activeTab) {
        case "Popular":
          movieList = await getPopularMovies();
          setPopularVideosLoaded(true);
          break;
        case "In Theaters":
          movieList = await getInTheatersMovies();
          setPopularVideosLoaded(true);
          break;

        default:
          break;
      }

      const movieDetails = await Promise.all(
        movieList.map(async (item: any) => {
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

  //   const handleTabChange = (tab: any) => {
  //     if (tab === "Popular" && !popularVideosLoaded) {
  //       // Prevent changing tab if popular videos are not loaded
  //       notFound;
  //       return;
  //     }
  //     setActiveTab(tab);
  //   };
  return (
    <div>
      <Tabs
        defaultValue="Popular"
        onValueChange={(value: any) => setActiveTab(value)}
      >
        <div className="flex gap-5 items-center mb-3">
          <p className="text-xl p-1 rounded">Movie Trailers</p>

          <TabsList>
            <TabsTrigger value="Popular">Popular</TabsTrigger>
            <TabsTrigger value="In Theaters">In Theaters</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Popular">
          {loading ? (
            <Loading />
          ) : (
            activeTab === "Popular" && (
              <div className="">
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden  max-w-screen-xl snap-x transition-colors">
                  {videos.map((movie: any) => (
                    <div key={movie.id}>
                      {movie.videoKey ? (
                        <div className="object-cover rounded w-full h-full flex justify-center items-center">
                          <Dialog>
                            <DialogTrigger className="h-fit" asChild>
                              <div className="object-cover rounded w-[500px] h-auto flex justify-center items-center cursor-pointer">
                                <Image
                                  src={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                                  alt={movie.title || movie.name}
                                  width={500}
                                  height={500}
                                  // loading="lazy"
                                  className="w-full h-full flex justify-center items-center"
                                  objectFit="cover"
                                  priority={true}
                                  placeholder="blur"
                                  blurDataURL={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                                />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="bg-black bg-opacity-75 p-4 rounded-lg">
                              <DialogHeader>
                                <DialogTitle className="pt-4 px-4 text-white">
                                  Video Trailer
                                </DialogTitle>
                              </DialogHeader>
                              <div className=" w-[500px] h-[500px] grid gap-4 py-4">
                                <ReactPlayer
                                  url={`https://www.youtube.com/watch?v=${movie.videoKey}`}
                                  width="100%"
                                  height="100%"
                                  playing={true}
                                  className="rounded-lg w-full h-full"
                                  config={{
                                    youtube: {
                                      playerVars: { showinfo: 0 },
                                    },
                                  }}
                                />
                                {/* <iframe
                                  src={`https://www.youtube.com/watch?v=${movie.videoKey}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  width={"100%"}
                                  height={"100%"}
                                  title={movie.title || movie.name}
                                ></iframe> */}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <p>No video available</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </TabsContent>
        <TabsContent value="In Theaters">
          {loading ? (
            <Loading />
          ) : (
            activeTab === "In Theaters" && (
              <div>
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden  max-w-screen-xl snap-x transition-colors">
                  {videos.map((movie: any) => (
                    <div key={movie.id}>
                      {movie.videoKey ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="object-cover rounded w-[500px] h-auto flex flex-col gap-3 justify-center items-center cursor-pointer">
                              <Image
                                src={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                                alt={movie.title || movie.name}
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-full h-full flex justify-center items-center object-cover"
                              />
                              <h2>{movie.title || movie.name}</h2>
                              <p></p>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="bg-black bg-opacity-75 p-4 rounded-lg">
                            <DialogHeader>
                              <DialogTitle className="pt-4 px-4 text-white">
                                Video Trailer
                              </DialogTitle>
                            </DialogHeader>
                            <div className=" w-[500px] h-[500px] grid gap-4 py-4">
                              <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${movie.videoKey}`}
                                width="100%"
                                height="100%"
                                playing={true}
                                className="rounded-lg"
                                config={{
                                  youtube: {
                                    playerVars: { showinfo: 0 },
                                  },
                                }}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <p>No video available</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LastestTrailer;
