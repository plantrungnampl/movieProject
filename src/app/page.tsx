import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import HomePage from "./homepage/page";
import { Suspense } from "react";
import Loading from "./loading";
const API_KEY = process.env.API_KEY;

export default async function Home() {
  // const res1 = await axios.get(
  //   `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
  // );
  // const res2 = await axios.get(
  //   `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  // );
  // const [data1, data2] = await Promise.all([res2.data, res1.data]);

  // if (res1.status !== 200 || res2.status !== 200) {
  //   throw new Error(data1.message || data2.message || "Failed to fetch data");
  // }

  // const result1 = data1.results;
  // const result2 = data2.results;

  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div>
          {/* <HomePage result={result2} result1={result1}></HomePage> */}
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
