import { getCollection, type CollectionEntry } from "astro:content";

const getPosts = async (
  filter?: (entry: CollectionEntry<"blog" | "weekly">) => unknown
) => {
  const blogPosts = (await getCollection("blog", filter)) ?? [];
  const weeklyPosts = (await getCollection("weekly", filter)) ?? [];
  return [...blogPosts, ...weeklyPosts];
};

export default getPosts;
