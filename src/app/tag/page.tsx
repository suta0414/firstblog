import { client, Post } from "@/_util/newt-client";
import { SideBar } from "@/components/sideBar/sideBar";
import Link from "next/link";

export default async function TagListPage() {
  const data = await client.getContents<Post>({
    appUid: "blog",
    modelUid: "article",
  });

  const groupedData = data.items.reduce<Record<string, typeof data.items>>(
    (acc, item) => {
      item.tags.forEach((tag) => {
        if (!acc[tag.name]) {
          acc[tag.name] = []; // タグが未定義なら空配列を作成
        }
        acc[tag.name].push(item);
      });
      return acc;
    },
    {}
  ); // 初期値は空オブジェクト

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <div className="lg:w-3/4 p-6">
          {Object.entries(groupedData).map(([tag, items]) => (
            <div key={tag} className="mb-6">
              <h2 className="text-2xl font-bold border-b-4 border-blue-400 pb-2">
                #{tag}
              </h2>
              <ul>
                {items.map((item) => (
                  <li
                    key={item._id}
                    className="mt-2 ml-4 list-disc hover:text-blue-400 underline"
                  >
                    <Link href={`/post/${item._id}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SideBar />
      </div>
    </div>
  );
}
