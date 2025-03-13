import { client, ProfileData } from "@/_util/newt-client";

export default async function Profile() {
  const data = await client.getContent<ProfileData>({
    appUid: "blog",
    modelUid: "profile",
    contentId: "67c88b6a33281c1d6577bfdd",
  });
  return (
    <div>
      <h1>プロフィール</h1>
      <h2>{data.name}</h2>
      {data.profile}
    </div>
  );
}
