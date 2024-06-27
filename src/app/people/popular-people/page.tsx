// "use client";
// import Loading from "@/app/loading";
// import Paginations from "@/components/Pagination/Paginations";
// import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import React, { Suspense } from "react";
// interface Person {
//   id: number;
//   profile_path: string;
//   original_title?: string;
//   name: string;
//   original_name?: string;
//   known_for?: { title: string }[];
// }
// function PopularPeople({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const [people, setPeople] = React.useState<Person[]>([]);
//   const [loading, setLoading] = React.useState(false);
//   const [pages, setPages] = React.useState(1);
//   const { page } = searchParams;
//   const [totalPages, setTotalPages] = React.useState(0);
//   React.useEffect(() => {
//     setLoading(true);
//     const fetchData = async () => {
//       try {
//         // const data = await fetchPeople(page ? page.toString() : 1);
//         const res = await fetch(
//           `/api/tmdb/people?page=${page ? page.toString() : 1}`
//         );
//         const data = await res.json();
//         setPeople(data.results);
//         setTotalPages(data.totalPages);
//         // setPeople(data.results);
//         // setTotalPages(data.totalPages);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [page, totalPages]);
//   const currentPage = page ? parseInt(page.toString()) : 1;
//   return (
//     <>
//       <div>
//         <h2 className="font-bold text-2xl">Popular People:</h2>

//         <div className="flex flex-wrap gap-3">
//           {loading ? (
//             <Loading number={20} />
//           ) : (
//             people.map((item: any) => (
//               <div key={item.id}>
//                 <Link href={"/"}>
//                   <Card className="flex-card-cal max-w-xl ">
//                     <div className=" max-w-[200px] h-auto relative ">
//                       <Image
//                         src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
//                         alt={item.original_title || item.name}
//                         className="object-contain w-full h-full rounded-t-lg  "
//                         width={100}
//                         height={200}
//                         layout="responsive"
//                         loading="lazy"
//                         placeholder="blur"
//                         blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                       />
//                     </div>
//                     <CardHeader className="">
//                       <CardTitle>{item.original_name || item.name}</CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </Link>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="flex justify-between mt-4">
//           <Suspense key={currentPage.toString()} fallback={<LoadingSkeleton />}>
//             <Paginations
//               currentPage={currentPage}
//               setPage={setPages}
//               totalPages={totalPages}
//             />
//           </Suspense>
//         </div>
//       </div>
//     </>
//   );
// }
// export default function PopularPeoplePage() {
//   return (
//     <Suspense fallback={<Loading number={1} />}>
//       <PopularPeople />
//     </Suspense>
//   );
// }
"use client";
import Loading from "@/app/loading";
import Paginations from "@/components/Pagination/Paginations";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/constants";

interface Person {
  id: number;
  profile_path: string;
  original_title?: string;
  name: string;
  original_name?: string;
  known_for?: { title: string }[];
}

export default function PopularPeople({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams;
  const currentPage = page ? parseInt(page.toString()) : 1;

  const { data, error } = useSWR(
    `/api/tmdb/people?page=${currentPage}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading number={20} />;

  const people: Person[] = data.results;
  const totalPages: number = data.totalPages;

  return (
    <>
      <div>
        <h2 className="font-bold text-2xl">Popular People:</h2>

        <div className="flex flex-wrap gap-3">
          {people.map((item: Person) => (
            <div key={item.id}>
              <Link href={"/"}>
                <Card className="flex-card-cal max-w-xl">
                  <div className="max-w-[200px] h-auto relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.original_title || item.name}
                      className="object-contain w-full h-full rounded-t-lg"
                      width={100}
                      height={200}
                      layout="responsive"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    />
                  </div>
                  <CardHeader className="">
                    <CardTitle>{item.original_name || item.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Suspense key={currentPage.toString()} fallback={<LoadingSkeleton />}>
            <Paginations
              currentPage={currentPage}
              setPage={(page) => (searchParams.page = page.toString())}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
