import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player/youtube";
import { Button } from "@/components/ui/button";

interface TrailerDialogProps {
  trailer?: string | null;
  title?: string;
  buttonTitle?: string;
}

const TrailerDialog = ({ trailer, title, buttonTitle }: TrailerDialogProps) => {
  const videoUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer}`
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {buttonTitle ? (
          <Button variant="outline">{buttonTitle}</Button>
        ) : (
          <div className="grid gap-4 py-4">
            {videoUrl ? (
              <ReactPlayer
                url={videoUrl}
                width="942px"
                height="530px"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex justify-center items-center p-4 font-bold text-2xl">
                No trailer available
              </div>
            )}
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pt-4 px-4">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              width="942px"
              height="530px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="flex justify-center items-center p-4 font-bold text-2xl">
              No trailer available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerDialog;
