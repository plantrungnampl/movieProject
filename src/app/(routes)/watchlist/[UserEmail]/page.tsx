"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserDataWatchList } from "@/app/api/fetchData";
import WatchLists from "@/components/WatchList/WatchLists";

export default function FavoriteMovie() {
  const [watchListUser, setWatchListUser] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.uid) {
        const data: any = await getUserDataWatchList(currentUser?.uid);
        const plainData = JSON.parse(JSON.stringify(data));
        // setWatchListUser(data);
        setWatchListUser(plainData);
      } else {
        setWatchListUser([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser?.uid]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">My Watchlist</h1>
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
    </div>
  );
}
