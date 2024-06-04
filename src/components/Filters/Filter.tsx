"use client";

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const genres = [
  "All",
  "Action & adventure",
  "animation",
  "comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Kids",
];
const sorting = ["A-Z", "Z-A"];
const filterOptions = [
  {
    id: "sort",
    title: "Sort by",
    option: sorting,
    value: sorting[0],
    type: "radio",
  },
  {
    id: "genre",
    title: "Genre by",
    option: genres,
    value: genres[0],
    type: "radio",
  },
];
const checkValidQuery = (queries: string[]) => {
  return queries.filter((query) => query !== "").length > 0;
};
const convertValidStringQuery = (queries: Record<string, string[]>) => {
  let q = "";
  for (const key in queries) {
    if (queries[key].length > 0) {
      q += `&${key}=${queries[key].join(",")}`;
    }
  }
  return q;
};
export const convertStringToQueriesObject = (
  searchParams: ReadonlyURLSearchParams
): Record<string, string[]> => {
  let selectQueries: Record<string, string[]> = {};
  searchParams.forEach((values, key) => {
    const queries = values.split(",");
    if (selectQueries[key]) {
      selectQueries[key].push(...queries);
    } else {
      selectQueries[key] = queries;
    }
  });
  return selectQueries;
};
export default function Filter() {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const [selectFilterQueries, setSelectFilterQueries] = React.useState<
  //     Record<string, string[]>
  //   >({});
  //   useEffect(() => {
  //     const paramsObj = convertStringToQueriesObject(searchParams);
  //     setSelectFilterQueries(paramsObj);
  //   //   }, [searchParams]);
  //   const handleSelectFilterOption = (
  //     e: React.ChangeEvent<HTMLSelectElement>
  //   ) => {
  //     const { name, value, type } = e.target;
  //     let selectQueries = selectFilterQueries;
  //     if (selectQueries[name]) {
  //       if (type === "radio") {
  //         selectQueries[name] = [value];
  //       } else if (selectQueries[name].includes(value)) {
  //         selectQueries[name] = selectQueries[name].filter(
  //           (query) => query !== value
  //         );
  //         if (!checkValidQuery(selectQueries[name])) {
  //           selectQueries[name] = [];
  //         } else {
  //           selectQueries[name].push(value);
  //         }
  //       } else if (selectQueries) {
  //         selectQueries[name] = [value];
  //       }
  //       router.push(
  //         {
  //           pathname: "/",
  //           query: convertValidStringQuery(selectQueries),
  //         },
  //         undefined,
  //         { scroll: false }
  //       );
  //     }
  //   };
  return (
    <div className="grid gap-1">
      {filterOptions.map((option) => (
        <div key={option.id}>
          <label htmlFor={option.id}>{option.title}</label>
          <select id={option.id}>
            {option.option.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

{
  /* <div>
<div className="grid gap-1">
  {filterOptions.map((option) => (
    <div key={option.id}>
      <label htmlFor={option.id}>{option.title}</label>
      <select
        id={option.id}
        name={option.id}
        value={selectFilterQueries[option.id]}
        onChange={handleSelectFilterOption}
      >
        {option.option.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  ))}
</div> */
}
