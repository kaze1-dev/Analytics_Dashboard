"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };
  const handlePageChange = (targetPage: number) => {
    router.push(createPageUrl(targetPage), { scroll: false });
  };
  return (
    <div className="flex items-center justify-center gap-6 py-6 select-none">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-neutral-400 text-xs font-bold cursor-pointer hover:bg-neutral-900 hover:text-neutral-200 hover:border-neutral-700 active:scale-[0.98] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-neutral-950 disabled:hover:text-neutral-400 disabled:hover:border-neutral-800 disabled:active:scale-100 transition-all duration-150 shadow-sm"
      >
        <ChevronLeft size={14} />
        <span>Previous</span>
      </button>
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
        <span>Page</span>
        <span className="text-neutral-200 font-mono text-xs bg-neutral-900 px-2 py-0.5 border border-neutral-800/80 rounded-md shadow-inner">
          {currentPage}
        </span>
        <span>of</span>
        <span className="text-neutral-400 font-mono text-xs">
          {totalPages}
        </span>
      </div>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-neutral-400 text-xs font-bold cursor-pointer hover:bg-neutral-900 hover:text-neutral-200 hover:border-neutral-700 active:scale-[0.98] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-neutral-950 disabled:hover:text-neutral-400 disabled:hover:border-neutral-800 disabled:active:scale-100 transition-all duration-150 shadow-sm"
      >
        <span>Next</span>
        <ChevronRight size={14} />
      </button>
      
    </div>
  );
};

export default Pagination;