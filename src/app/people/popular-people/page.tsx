"use client";
import { fetchPeople } from "@/app/api/fetchPeople";
import Loading from "@/app/loading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PopularPeople() {
  const [people, setPeople] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const people = await fetchPeople();
        setPeople(people);
      } catch (error) {
        setLoading(false);
        return;
      }
    };
    fetchData();
  }, []);
  console.log(people);
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-2">Popular People:</h2>
        <div className="flex flex-wrap gap-3">
          {people.length > 0 ? (
            people.map((item: any) => (
              <div key={item.id}>
                <Link href={"/"}>
                  <Card className="flex-card-cal max-w-xl ">
                    <div className=" max-w-[200px] h-auto relative ">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                        alt={item.original_title || item.name}
                        className="object-contain w-full h-full rounded-t-lg  "
                        width={100}
                        height={200}
                        layout="responsive"
                        priority={true}
                        placeholder="blur"
                        blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      />
                    </div>
                    <CardHeader className="">
                      <CardTitle>{item.original_name || item.name}</CardTitle>
                      <CardDescription>
                        {item.known_for.overview}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
