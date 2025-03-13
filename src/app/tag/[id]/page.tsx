import { client, Post } from "@/_util/newt-client";
import { ArticleList } from "@/components/articleList/articleList";

export default async function TagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const getData = await client.getContents<Post>({
    appUid: "blog",
    modelUid: "article",
    query: {
      tags: {
        in: [id],
      },
    },
  });
  const data = getData.items;
  return (
    <div className="block lg:flex mt-16">
      <ArticleList data={data} source="tag" />
    </div>
  );
}
