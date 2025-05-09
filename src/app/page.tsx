import { client, Post } from "@/_util/newt-client";
import { Pagination } from "@/components/pagination/pagination";
import { ArticleList } from "@/components/articleList/articleList";
import { SideBar } from "@/components/sideBar/sideBar";
import { getCurrentPage } from "@/_util/getCurrentPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const data = await client.getContents<Post>({
    appUid: "blog",
    modelUid: "article",
  });

  const currentItems = await getCurrentPage({
    searchParams,
    data,
  });

  const length = data.items.length;

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="flex flex-col lg:flex-row flex-wrap mt-16">
        <ArticleList data={currentItems} />
        <SideBar />
        <Pagination length={length} source="items" />
      </div>
    </div>
  );
}
