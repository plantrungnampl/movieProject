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
  const [backgroundImages, setBackgroundImages] = React.useState("");
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${backgroundImages})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.3s ease-in-out",
      }}
    >
      <div className="flex p-9 gap-4 overflow-x-auto overflow-y-hidden max-w-screen-xl snap-x transition-colors custom-scrollbar ">
        {videos.map((movie: any) => (
          <div
            key={movie.id}
            className="relative min-w-[400px] overflow-hidden bg-cover bg-no-repeat "
            onMouseEnter={() =>
              setBackgroundImages(
                `https://img.youtube.com/vi/${movie.videoKey}/0.jpg`
              )
            }
          >
            {movie.videoKey ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer min-w-[400px]  relative transition duration-300 ease-in-out hover:scale-110">
                    <Image
                      src={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
                      alt={movie.title || movie.name}
                      width={400}
                      height={300}
                      className="rounded-3xl object-contain w-full h-full "
                      priority={true}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={`https://img.youtube.com/vi/${movie.videoKey}/0.jpg`}
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
    </div>
  );
}
