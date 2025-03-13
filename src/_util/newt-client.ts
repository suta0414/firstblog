import type { Content } from "newt-client-js";
import { createClient } from "newt-client-js";

export const client = createClient({
  spaceUid: "formspace",
  token: process.env.NEXT_PUBLIC_NEWT_CDN_API_KEY as string,
  apiType: "cdn",
});

export interface Post extends Content {
  title: string;
  body: string;
  coverImage: {
    src: string;
    altText: string;
  };
  author: {
    fullName: string;
  };
  tags: {
    _id: string;
    name: string;
  }[];
}

export interface ProfileData extends Content {
  name: string;
  image: {
    src: string;
    altText: string;
  };
  profile: string;
}

export interface Tags extends Content {
  name: string;
  slug: string;
  _id: string;
}
export interface Author extends Content {
  fullName: string;
  slug: string;
  _id: string;
  biography: string;
}
