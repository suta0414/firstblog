import { getCurrentPage } from "@/_util/getCurrentPage";
import { client, Post } from "@/_util/newt-client";
import { ArticleList } from "@/components/articleList/articleList";
import { Pagination } from "@/components/pagination/pagination";
import { SideBar } from "@/components/sideBar/sideBar";

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { id } = await params;
  const data = await client.getContents<Post>({
    appUid: "blog",
    modelUid: "article",
    query: {
      author: {
        in: [id],
      },
    },
  });

  const currentItems = await getCurrentPage({
    searchParams,
    data,
  });

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <ArticleList data={currentItems} source="author" />
        <SideBar />
      </div>
      <Pagination data={data} />
    </div>
  );
}
