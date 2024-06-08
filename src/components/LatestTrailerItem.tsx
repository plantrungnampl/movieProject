import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import TrailerDialog from "./TrailerDialog";
import { FaPlay } from "react-icons/fa";

export default function LatestTrailerItem({ videos }: { videos: any[] }) {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden max-w-screen-xl snap-x transition-colors">
        {videos.map((movie: any) => (
          <div key={movie.id} className="relative min-w-[400px] h-auto">
            {movie.videoKey ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer relative">
                    <Image
                      src={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                      alt={movie.title || movie.name}
                      width={400}
                      height={300}
                      className="rounded-lg object-contain w-full h-full"
                      priority={true}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
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
    </div>
  );
}
