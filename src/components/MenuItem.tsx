"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
export default function MenuItem({
  title,
  address,
  Icon,
}: {
  title: string;
  address: string;
  Icon: React.FC;
}) {
  // const searchParams = useSearchParams();
  // const genre = searchParams.get("genre");
  return (
    <>
      <Link className="flex gap-1 justify-center items-center" href={address}>
        <Icon />
        <p className=" hidden sm:block text-sm text-white">{title}</p>
      </Link>
    </>
  );
}
