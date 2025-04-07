import { formattedDate } from "@/_util/formattedDate";
import { Post } from "@/_util/newt-client";
import Image from "next/image";
import Link from "next/link";

export function ArticleList({
  data,
  source,
}: {
  data: Post[];
  source?: string;
}) {
  let title = "";
  if (source === "tag") {
    title = `#${data[0].tags[0].name}の記事一覧`;
  }
  if (source === "author") {
    title = `${data[0].author.fullName}の記事一覧`;
  }

  return (
    <div className="w-full mx-auto lg:w-3/4 bg-yellow-100 bg-opacity-25 pt-4 pb-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {title ? title : "記事一覧"}
      </h2>
      {/* ✅ 記事リスト */}
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {data.map((datum) => (
          <li key={datum._id} className="relative w-11/12 sm:w-full mx-auto">
            <Link
              href={`/post/${datum._id}`}
              className="block sm:flex lg:block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <ul>
                {datum.tags.map((tag) => (
                  <li
                    key={tag._id}
                    className="absolute top-2 left-2 bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded-lg"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
              <div className="w-full md:w-5/12 lg:w-full">
                <Image
                  src={datum.coverImage.src}
                  width={360}
                  height={240}
                  alt={datum.coverImage.altText}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between w-full md:w-7/12 lg:w-full p-4 h-[200px] sm:h-[240px] lg:h-[160px]">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {datum.title}
                  </h2>
                  <p>{datum.author.fullName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm lg:text-base text-gray-500">
                    この記事を読む
                  </p>
                  <div className="text-right text-xs lg:text-sm">
                    <p className=" text-gray-500">
                      投稿日:{formattedDate(datum._sys.createdAt)}
                    </p>
                    <p className=" text-gray-500">
                      更新日時:{formattedDate(datum._sys.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
