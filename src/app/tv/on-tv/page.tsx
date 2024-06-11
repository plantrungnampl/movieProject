import Link from "next/link";
import React from "react";

export default function OnTv() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <h1 className="text-5xl  font-bold mb-8 animate-pulse">Coming Soon</h1>
      <p className=" text-lg mb-8">
        Were working hard to bring you something amazing. Stay tuned!
      </p>
      <div className="flex items-center justify-center">
        <Link
          href={"/"}
          className="px-4 py-2  font-semibold bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
