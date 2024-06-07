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
  trailer: string | null;
}

const TrailerDialog = ({ trailer }: TrailerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Video Trailer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pt-4 px-4">Video Trailer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
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
