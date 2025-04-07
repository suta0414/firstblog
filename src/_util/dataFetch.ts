import { Author, client, ProfileData, Tags } from "@/_util/newt-client";

export async function fetchSideBarData() {
  const [profile, tags, authors] = await Promise.all([
    client.getContent<ProfileData>({
      appUid: "blog",
      modelUid: "profile",
      contentId: "67c88b6a33281c1d6577bfdd",
    }),
    client.getContents<Tags>({
      appUid: "blog",
      modelUid: "tag",
    }),

    client.getContents<Author>({
      appUid: "blog",
      modelUid: "author",
    }),
  ]);
  return { profile, tags, authors };
}
