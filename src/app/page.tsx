"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@/_util/newt-client";
import { fetchArticleData } from "@/_util/dataFetch";
import { Pagination } from "@/components/pagination/pagination";
import { ArticleList } from "@/components/articleList/articleList";
import { SideBar } from "@/components/sideBar/sideBar";

export default function Page() {
  const searchParams = useSearchParams();

  // ✅ ページ番号の取得
  const currentPage = Number(searchParams.get("page")) || 1;

  const itemsPerPage = 6; // ✅ 1ページに表示する記事数
  const [articleData, setArticleData] = useState<{ items: Post[] }>({
    items: [],
  });

  // ✅ データ取得
  useEffect(() => {
    async function fetchData() {
      try {
        const { articles } = await fetchArticleData();
        setArticleData(articles);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchData();
  }, []);

  // ✅ 総ページ数を計算
  const totalPages = Math.ceil(articleData.items.length / itemsPerPage);

  // ✅ 現在のページのデータを取得
  const currentItems = articleData.items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <ArticleList data={currentItems} />

        <SideBar />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
