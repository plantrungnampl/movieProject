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
  trailerKey: string | null;
}

const TrailerDialog = ({ trailerKey }: TrailerDialogProps) => {
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
          {trailerKey ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              width="942px"
              height="530px"
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
