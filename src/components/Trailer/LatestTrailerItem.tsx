import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import TrailerDialog from "../TrailerDialog";
import { FaPlay } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import BackgroundImage from "../BackgroundImage";

export default function LatestTrailerItem({ videos }: { videos: any[] }) {
  const [backgroundImages, setBackgroundImages] = React.useState("");
  return (
    <>
      <div className=" mx-auto w-full">
        <BackgroundImage src={backgroundImages} alt={"image"}>
          <Head>
            {videos.map((movie: any) => (
              <Link
                key={movie.id}
                rel="preload"
                href={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                as="image"
              />
            ))}
          </Head>
          <div className="flex gap-3 p-10 overflow-x-auto overflow-y-hidden max-w-screen-xl snap-x transition-colors custom-scrollbar ">
            {videos.map((movie: any) => (
              <div
                key={movie.id}
                className="relative min-w-[300px] overflow-hidden bg-cover bg-no-repeat "
                onMouseEnter={() =>
                  setBackgroundImages(
                    `https://img.youtube.com/vi/${movie.videoKey}/0.jpg`
                  )
                }
              >
                {movie.videoKey ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer min-w-[300px] relative transition duration-300 ease-in-out hover:scale-110 ">
                        <Image
                          src={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                          alt={movie.title || movie.name}
                          width={300}
                          height={400}
                          className=" rounded-3xl w-auto h-auto object-cover"
                          priority={true}
                          placeholder="blur"
                          blurDataURL={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                          loading="eager"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out hover:scale-150">
                          <FaPlay className="text-white text-6xl opacity-75" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-black bg-opacity-75 p-4 rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="pt-4 px-4 text-white">
                          Video Trailer
                        </DialogTitle>
                      </DialogHeader>
                      <TrailerDialog trailer={movie.videoKey} />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p>No video available</p>
                )}
              </div>
            ))}
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
        </BackgroundImage>
      </div>
    </>
  );
}
