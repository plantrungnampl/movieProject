"use client";
import { getSerVerData } from "@/app/api/fetchData";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WatchLists from "@/components/WatchList/WatchLists";

export default function FavoriteMovie() {
  const [watchListUser, setWatchListUser] = React.useState<any[]>([]);
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      if (currentUser?.uid) {
        const data: any = await getSerVerData(currentUser?.uid);
        setWatchListUser(data);
      } else {
        setWatchListUser([]);
      }
    }
    fetchData();
  }, [currentUser?.uid]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {watchListUser.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Watchlist </h1>
          {watchListUser.map((item) => (
            <div key={item.id}>
              <WatchLists item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>No Data</h1>
        </div>
      )}
    </div>
  );
}
