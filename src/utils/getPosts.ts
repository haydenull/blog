import { getCollection, type CollectionEntry } from "astro:content";

const getPosts = async (
  filter?: (entry: CollectionEntry<"blog" | "weekly" | "talk">) => unknown
) => {
  const blogPosts = (await getCollection("blog", filter)) ?? [];
  const weeklyPosts = (await getCollection("weekly", filter)) ?? [];
  const talkPosts = (await getCollection("talk", filter)) ?? [];
  return [...blogPosts, ...weeklyPosts, ...talkPosts];
};

export default getPosts;
