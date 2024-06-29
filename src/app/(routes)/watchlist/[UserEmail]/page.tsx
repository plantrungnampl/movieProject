"use client";
import { getUserDataWatchList } from "@/app/api/fetchData";
import React, { Suspense, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WatchLists from "@/components/WatchList/WatchLists";
import { getUserId } from "@/app/api/getEmail";
import Loading from "@/app/loading";

export default function FavoriteMovie() {
  const [watchListUser, setWatchListUser] = React.useState<any[]>([]);
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      if (currentUser?.uid) {
        const data: any = await getUserDataWatchList(currentUser?.uid);
        setWatchListUser(data);
        setLoading(false);
      } else {
        setWatchListUser([]);
      }
    }
    fetchData();
  }, [currentUser?.uid]);
  useEffect(() => {
    async function getUerId() {
      await getUserId(currentUser?.uid);
    }
    getUerId();
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
      <Suspense fallback={<Loading number={20} />}>
        <h1 className="font-bold text-2xl">My Watchlist </h1>
        {watchListUser.length > 0 ? (
          <div>
            {watchListUser.map((item) => (
              <div key={item.id}>
                <WatchLists item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>Watch List empty</h1>
          </div>
        )}
      </Suspense>
    </div>
  );
}
