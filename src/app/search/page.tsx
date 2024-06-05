// export const metadata = {
//   title: "search",
//   description: "search movie",
// };
// // import { IItem, IResult } from "@/components/Result";
// import { Input } from "@/components/ui/input";
// import { defaultSort, sorting } from "@/lib/constants";
// import React, { Suspense } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Image from "next/image";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import Link from "next/link";
// export default async function SearchPage({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }) {
//   const { q: searchValue } = searchParams as { [key: string]: string };
//   const res = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchValue}&page=1&include`
//   );
//   const data = await res.json();
//   const result = data.results;

//   return (
//     <>
//       <div>
//         <p className="uppercase mb-3 ">
//           <span>{` Showing ${result.length} result for ${searchValue}`}</span>
//         </p>
//         {result.length > 0 ? (
//           result.map((item: any) => (
//             <Link href={`/movies/${item.id}`} key={item.id}>
//               <Card className="flex" key={item.id}>
//                 <CardHeader>
//                   <div className="w-[300px] h-[300px]">
//                     <Image
//                       className="rounded object-cover w-full h-full"
//                       loading="lazy"
//                       src={`https://image.tmdb.org/t/p/w500${
//                         item.poster_path || item.backdrop_path
//                       }`}
//                       alt={item.original_title || item.name}
//                       width={300}
//                       height={300}
//                     />
//                   </div>
//                 </CardHeader>
//                 <CardContent className="flex flex-col justify-center gap-2">
//                   <CardTitle> {item.original_title || item.name}</CardTitle>
//                   <CardDescription>
//                     {item.first_air_date || item.release_date}
//                   </CardDescription>
//                   <CardDescription>{item.overview}</CardDescription>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))
//         ) : (
//           <h1>No result found</h1>
//         )}
//       </div>
//     </>
//   );
// }
import axios from "axios";
import React, { Suspense } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "search",
  description: "search movie",
};

const fetchSearchResults = async (searchValue: string) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchValue}&page=1&include`
  );
  return res.data;
};

const SearchResults = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { q: searchValue } = searchParams;
  const data = await fetchSearchResults(searchValue);
  const result = data.results;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <p className="uppercase mb-3 ">
          <span>{` Showing ${result.length} result for ${searchValue}`}</span>
        </p>
        {result.length > 0 ? (
          result.map((item: any) => (
            <Link href={`/movies/${item.id}`} key={item.id}>
              <Card className="flex" key={item.id}>
                <CardHeader>
                  <div className="w-[300px] h-[300px]">
                    <Image
                      className="rounded object-cover w-full h-full"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.poster_path || item.backdrop_path
                      }`}
                      alt={item.original_title || item.name}
                      width={300}
                      height={300}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-center gap-2">
                  <CardTitle> {item.original_title || item.name}</CardTitle>
                  <CardDescription>
                    {item.first_air_date || item.release_date}
                  </CardDescription>
                  <CardDescription>{item.overview}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <h1>No result found</h1>
        )}
      </Suspense>
    </div>
  );
};

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults searchParams={searchParams as { [key: string]: string }} />
    </Suspense>
  );
};

export default SearchPage;
