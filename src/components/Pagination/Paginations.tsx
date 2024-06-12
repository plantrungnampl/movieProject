"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
interface PaginationsProps {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Paginations: React.FC<PaginationsProps> = ({
  currentPage,
  setPage,
  totalPages,
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const router = useRouter();
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      router.replace(`${pathName}?page=${currentPage - 1}`);
    }
  }, [currentPage, pathName, router]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      router.replace(`${pathName}?page=${currentPage + 1}`);
    }
  }, [currentPage, pathName, totalPages, router]);
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
      setPage(page);
    } else {
      params.delete("page");
      // setPage(1);
    }

    replace(`${pathName}?${params.toString()}`);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${pathName}?page=${i}`}
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };
  return (
    <div className="flex justify-between mt-4">
      <div>
        <div className="flex justify-between mt-4">
          <Pagination
            key={searchParams?.get("page")}
            defaultValue={searchParams.get("page")?.toString()}
          >
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`${pathName}?page=${currentPage - 1}`}
                  className="cursor-pointer"
                  onClick={handlePreviousPage}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationEllipsis />

              <PaginationItem>
                <PaginationNext
                  href={`${pathName}?page=${currentPage + 1}`}
                  className="cursor-pointer"
                  onClick={handleNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Paginations;
