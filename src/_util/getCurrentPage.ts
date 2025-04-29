import { Post } from "./newt-client";

// ✅ 1ページに表示する記事数
export const itemsPerPage = 5;

export async function getCurrentPage({
  searchParams,
  data,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
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

export const TaxonomyPerPage = 2;

export async function getCurrentTaxonomyPage({
  searchParams,
  groupedData,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  groupedData: Record<string, Post[]>;
}) {
  // ✅ ページ番号の取得
  const param = await searchParams;
  const currentPage = Number(param.page) || 1;

  const tagNames = Object.keys(groupedData);

  const selectedTagNames = tagNames.slice(
    (currentPage - 1) * TaxonomyPerPage,
    currentPage * TaxonomyPerPage
  );

  // 表示するタグのみで構成されたデータを返す
  const paginatedGroupedData: Record<string, Post[]> = {};
  selectedTagNames.forEach((tag) => {
    paginatedGroupedData[tag] = groupedData[tag];
  });

  return paginatedGroupedData;
}
