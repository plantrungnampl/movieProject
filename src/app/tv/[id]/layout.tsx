import React, { Suspense } from "react";

export default function DetailTvlayout({
  children,
  backdropUrl,
}: {
  children: React.ReactNode;
  backdropUrl: string;
}) {
  return (
    <div className="mt-[61px] relative w-full min-h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-none"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* gradianrt */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to right, rgba(220, 220, 220, 1) calc((50vw - 170px) - 340px), rgba(220, 220, 220, 0.84) 50%, rgba(220, 220, 220, 0.84) 100%)",
        }}
      />
      <div className="relative p-0">
        <Suspense fallback={<div>Loading.....</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
