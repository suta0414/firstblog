"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
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

      {totalPages > 10 ? (
        <>
          {currentPage > 3 && <span>...</span>}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => Math.abs(page - currentPage) <= 2)
            .map((page) => (
              <button key={page} onClick={() => goToPage(page)}>
                {page}
              </button>
            ))}
          {currentPage < totalPages - 2 && <span>...</span>}
        </>
      ) : (
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 border rounded ${
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
