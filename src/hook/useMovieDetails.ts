import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ifExitItem } from "@/service/serives";
import { getDataMovieServer } from "@/app/api/getDataMovie";

export const useMovieDetails = (id: string) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watchList, setWatchList] = useState<boolean | null | any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        ifExitItem(user.uid, id).then((data: any) => {
          setWatchList(data);
        });
      }
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const data = await getDataMovieServer(id);
      if (data.error) {
        setError(data.error);
      } else {
        setDetail(data);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return { detail, loading, error, currentUser, watchList };
};
