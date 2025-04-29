"use client";

import { itemsPerPage, TaxonomyPerPage } from "@/_util/getCurrentPage";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  length: number;
  source: string;
}

export function Pagination({ length, source }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  let totalPages: number;

  if (source === "items") {
    totalPages = Math.ceil(length / itemsPerPage);
  } else if (source === "taxonomies") {
    totalPages = Math.ceil(length / TaxonomyPerPage);
  } else {
    totalPages = 0;
  }

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center w-full mt-4 mb-10 space-x-2 order-2 lg:order-3">
      {/* ⬅️ 前へ */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        前へ
      </button>

      {totalPages > 5 ? (
        <div className="flex items-center">
          {/* First page */}
          <button
            onClick={() => goToPage(1)}
            className={`px-4 py-2 border rounded mx-1 ${
              currentPage === 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            1
          </button>

          {/* Ellipsis after first page */}
          {currentPage - 1 > 2 && <span className="mx-1">...</span>}

          {/* Pages around current page */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                Math.abs(page - currentPage) <= 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 border rounded mx-1 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

          {/* Ellipsis before last page */}
          {currentPage + 1 < totalPages - 1 && (
            <span className="mx-1">...</span>
          )}

          {/* Last page */}
          <button
            onClick={() => goToPage(totalPages)}
            className={`px-4 py-2 border rounded mx-1 ${
              currentPage === totalPages
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {totalPages}
          </button>
        </div>
      ) : (
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 border rounded mx-1 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))
      )}

      {/* ➡️ 次へ */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        次へ
      </button>
    </div>
  );
}
