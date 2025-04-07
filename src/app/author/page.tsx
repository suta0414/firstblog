import { client, Post } from "@/_util/newt-client";
import { SideBar } from "@/components/sideBar/sideBar";
import Link from "next/link";

export default async function AuthorListPage() {
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

  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <div className="lg:w-3/4 p-6">
          {Object.entries(groupedData).map(([author, items]) => (
            <div key={author} className="mb-6">
              <h2 className="text-2xl font-bold border-b-4 border-blue-400 pb-2">
                {author}
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
        <SideBar />
      </div>
    </div>
  );
}
