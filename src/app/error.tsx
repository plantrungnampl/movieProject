"use client";
import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: string;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div>
      <h1>{error}</h1>
      zzz
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
