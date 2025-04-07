import { client, Post } from "@/_util/newt-client";
import { SideBar } from "@/components/sideBar/sideBar";
import parse from "html-react-parser";
import Image from "next/image";

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
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <div className="lg:w-3/4 text-center">
          <h1 className="inline-block text-center text-3xl font-bold my-6 pb-2 border-b-2 border-blue-400">
            {data.title}
          </h1>
          <p className="text-right w-3/4 mx-auto text-sm">
            {data.author.fullName}
          </p>
          <div className="text-left w-3/4 mx-auto">{parse(data.body)}</div>
          <ul className="flex flex-wrap justify-end w-3/4 mx-auto mt-6 text-sm">
            {data.tags.map((tag) => (
              <li
                key={tag._id}
                className="bg-blue-400 text-white font-bold px-2 py-1 rounded-lg"
              >
                #{tag.name}
              </li>
            ))}
          </ul>
          <div className="w-3/4 mx-auto mt-6 ">
            <Image
              src={data.coverImage.src}
              width={360}
              height={240}
              alt={data.coverImage.altText}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
