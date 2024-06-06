// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { toast } from "@/utils/toastUtil";
// import { isLoggedIn } from "@/hook/useAuth";
// import { addToWatchList, removeFromWatchList } from "@/service/serives";

// interface WatchListButtonProps {
//   detail: any;
//   watchList: boolean;
//   currentUser: any;
// }

// const WatchListButton = ({
//   detail,
//   watchList,
//   currentUser,
// }: WatchListButtonProps) => {
//   const router = useRouter();

//   const handleBookmarkClick = async () => {
//     if (!isLoggedIn()) {
//       toast({
//         title: "Login",
//         description: "Please login to continue",
//         style: {
//           background: "red",
//           color: "white",
//         },
//       });
//       router.push("/login");
//       return;
//     }
//     const data = {
//       id: detail?.id,
//       title: detail?.title,
//       overview: detail?.overview,
//       poster_path: detail?.poster_path,
//       backdrop_path: detail?.backdrop_path,
//       vote_average: detail?.vote_average,
//       release_date: detail?.release_date,
//     };
//     const dataId = detail?.id.toString();

//     try {
//       if (watchList) {
//         await removeFromWatchList(currentUser?.uid, dataId);
//         toast({
//           title: "Removed from Watchlist",
//           description: "You have removed this movie from your watchlist",
//           style: {
//             background: "green",
//             color: "white",
//           },
//           duration: 5000,
//         });
//       } else {
//         await addToWatchList(currentUser?.uid, dataId, data);
//         toast({
//           title: "Added to Watchlist",
//           description: "You have added this movie to your watchlist",
//           style: {
//             background: "green",
//             color: "white",
//           },
//           duration: 5000,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       toast({
//         title: "Error",
//         description: "There was an error adding the movie to your watchlist",
//         style: {
//           background: "red",
//           color: "white",
//         },
//         duration: 5000,
//       });
//     }
//   };

//   return (
//     <Button onClick={handleBookmarkClick}>
//       {watchList ? <FaBookmark /> : <FaRegBookmark />}
//     </Button>
//   );
// };

// export default WatchListButton;
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { BookmarkButtonProps } from "@/model/types";

const BookmarkButton = ({
  watchList,
  handleBookmarkClick,
}: BookmarkButtonProps) => {
  return (
    <Button onClick={handleBookmarkClick}>
      {watchList ? <FaBookmark /> : <FaRegBookmark />}
    </Button>
  );
};

export default BookmarkButton;
