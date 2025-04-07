"use client";

import { Author, ProfileData, Tags } from "@/_util/newt-client";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { fetchSideBarData } from "@/_util/dataFetch";

export function SideBar() {
  const [profile, setProfile] = useState<ProfileData>();

  const [tags, setTags] = useState<Tags[]>();
  const [authors, setAuthors] = useState<Author[]>();
  useEffect(() => {
    async function fetchData() {
      try {
        const { profile, tags, authors } = await fetchSideBarData();
        setProfile(profile);
        setTags(tags.items);
        setAuthors(authors.items);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-full lg:w-1/4 bg-pink-100 bg-opacity-25 px-4 order-3 lg:order-2 mb-12">
      {profile && profile.image?.src ? (
        <div className="h-fit border-2 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow text-center">
          <h2 className="text-2xl text-center font-bold text-white bg-blue-400 py-3">
            PROFILE
          </h2>
          <div className="flex flex-col lg:flex-col sm:flex-row items-center mb-6 lg:mb-0">
            <div className="w-full lg:w-full sm:w-1/3">
              <h3 className="text-lg font-bold text-center mt-2 mb-4">
                {profile.name}
              </h3>
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden">
                <Image
                  src={profile.image.src}
                  width={340}
                  height={240}
                  alt={profile.image?.altText || "Profile image"}
                  className="object-cover w-auto h-auto"
                />
              </div>
            </div>
            <div className="p-4 mx-auto">
              {profile?.profile ? parse(profile.profile) : ""}
            </div>
          </div>
          <div className="text-sm mb-4 text-blue-500 hover:text-blue-700 underline font-semibold">
            <Link href="/profile">プロフィールページへ</Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          プロフィール情報がありません
        </p>
      )}

      <div className="text-center  h-fit border-2 mt-4 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold text-white bg-blue-400 py-3">TAGS</h2>
        <ul className="mt-2 mb-4 flex">
          {tags ? (
            tags.map((tag) => (
              <li key={tag._id} className="mt-2 ml-2 text-white">
                <Link
                  className="bg-slate-400 bg-opacity-75 p-1 rounded-md hover:bg-slate-600"
                  href={`/tag/${tag._id}`}
                >
                  #{tag.name}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">タグがありません</p>
          )}
        </ul>
        <div className="text-sm mb-4 text-blue-500 hover:text-blue-700 underline font-semibold">
          <Link href={`/tag`}>タグ一覧ページへ</Link>
        </div>
      </div>

      <div className="text-center h-fit border-2 mt-4 shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold text-white bg-blue-400 py-3">
          AUTHORS
        </h2>
        <ul className="mt-2 mb-4 flex">
          {authors ? (
            authors.map((author) => (
              <li key={author._id} className="mt-2 ml-2 text-white">
                <Link
                  className="bg-slate-400 bg-opacity-75 p-1 rounded-md hover:bg-slate-600"
                  href={`/author/${author._id}`}
                >
                  #{author.fullName}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">著者情報がありません</p>
          )}
        </ul>
        <div className="text-sm mb-4 text-blue-500 hover:text-blue-700 underline font-semibold">
          <Link href={`/author`}>著者一覧ページへ</Link>
        </div>
      </div>
    </div>
  );
}
