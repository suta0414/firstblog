import { getCurrentTaxonomyPage } from "@/_util/getCurrentPage";
import { client, Post } from "@/_util/newt-client";
import { Pagination } from "@/components/pagination/pagination";
import { SideBar } from "@/components/sideBar/sideBar";
import Link from "next/link";

export default async function AuthorListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const data = await client.getContents<Post>({
    appUid: "blog",
    modelUid: "article",
  });

  const groupedData = data.items.reduce<Record<string, typeof data.items>>(
    (acc, item) => {
      if (!acc[item.author.fullName]) {
        acc[item.author.fullName] = [];
      }
      acc[item.author.fullName].push(item);
      return acc;
    },
    {}
  ); // 初期値は空オブジェクト

  const currentItems = await getCurrentTaxonomyPage({
    searchParams,
    groupedData,
  });

  const length = Object.keys(groupedData).length;

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="flex flex-col lg:flex-row flex-wrap mt-16">
        <div className="text-center lg:w-3/4 mb-12">
          <h1 className="inline-block text-3xl font-bold mb-6 pb-2 border-b-4 border-blue-400">
            著者一覧
          </h1>
          <div className="lg:w-3/4 p-6 text-left">
            {Object.entries(currentItems).map(([author, items]) => (
              <div key={author} className="mb-6">
                <h2 className="text-2xl font-bold border-b-4 border-blue-400 pb-2">
                  #{author}
                </h2>
                <ul>
                  {items.map((item) => (
                    <li
                      key={item._id}
                      className="mt-2 ml-4 list-disc hover:text-blue-700 underline"
                    >
                      <Link href={`/post/${item._id}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <SideBar />
        <Pagination length={length} source="taxonomies" />
      </div>
    </div>
  );
}
