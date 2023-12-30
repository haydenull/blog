import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

// 创建一个函数来获取文章数据
async function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  // const mdxSource = await serialize(content);
  // return {
  //   slug,
  //   frontMatter: data,
  //   mdxSource,
  // };
  return {
    frontMatter: data,
    content,
  };
}
export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  console.log("[faiz:] === post", post);
  return (
    <div>
      <h1>{post.frontMatter.title}</h1>
      <MDXRemote source={post.content} />
    </div>
  );
}
