"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading({ number }: { number: number }) {
  return (
    <main className="p-10 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
      {Array.from({ length: number }).map((_, index) => (
        <div key={index} className="mt-[62px]">
          <div className="flex items-center space-x-4 max-w-screen-2xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
