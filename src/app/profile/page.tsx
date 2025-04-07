import { client, ProfileData } from "@/_util/newt-client";
import Image from "next/image";
import parse from "html-react-parser";
import { SideBar } from "@/components/sideBar/sideBar";

export default async function Profile() {
  const data = await client.getContent<ProfileData>({
    appUid: "blog",
    modelUid: "profile",
    contentId: "67c88b6a33281c1d6577bfdd",
  });
  return (
    <div className="max-w-[1300px] mx-auto mb-20">
      <div className="block lg:flex mt-16">
        <div className="text-center lg:w-3/4 mb-12">
          <h1 className="inline-block text-3xl font-bold my-6 pb-2 border-b-4 border-blue-400">
            プロフィール
          </h1>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <Image
            src={data.image.src}
            width={340}
            height={240}
            alt={data.image?.altText || "Profile image"}
            className="block mx-auto my-4 object-cover w-auto h-full max-h-[480px]"
          />
          <div className="text-left w-1/2 mx-auto text-xl">
            {parse(data.profile)}
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
