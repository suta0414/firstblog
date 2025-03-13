import { client, Post } from "@/_util/newt-client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await client.getContent<Post>({
    appUid: "blog",
    modelUid: "article",
    contentId: slug,
  });

  return (
    <div className="p-4">
      <h1>{data.title}</h1>

      <article
        className="prose prose-sm"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </div>
  );
}
