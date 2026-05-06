"use client";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-4 py-4 text-neutral-300 text-sm">
      <button disabled={currentPage <=1} onClick={() => router.push(createPageUrl(currentPage - 1), {scroll: false})} className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1 text-neutral-200">Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button disabled={currentPage >= totalPages} onClick={() => router.push(createPageUrl(currentPage + 1), {scroll: false})} className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1 text-neutral-200">Next</button>
    </div>
  )
}

export default Pagination