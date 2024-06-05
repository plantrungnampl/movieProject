"use client";
import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  //   console.log(error);
  // }, [error]);
  return (
    <div>
      <h1>{error.message}</h1>

      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
