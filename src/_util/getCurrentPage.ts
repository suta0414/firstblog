import { Post } from "./newt-client";

// ✅ 1ページに表示する記事数
export const itemsPerPage = 2;

export async function getCurrentPage({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | undefined };
  data: { items: Post[] };
}) {
  // ✅ ページ番号の取得
  const param = await searchParams;
  const currentPage = Number(param.page) || 1;

  // ✅ 現在のページのデータを取得
  const currentItems = data.items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return currentItems;
}
