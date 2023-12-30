import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import PostCard from "@/components/PostCard";

// 1. 创建一个函数来获取文章数据
function getPosts() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

// 2. 获取文章数据并将其作为 props 传递给 Home 组件
const allPostsData = getPosts();
export default function Home() {
  const allPostsData = getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* ... */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* 遍历 allPostsData，为每篇文章创建一个列表项 */}
        {allPostsData.map((post) => (
          <PostCard key={post.id} post={{ frontMatter: post }} />
        ))}
      </div>
    </main>
  );
}

// 3. 添加 getStaticProps 函数来在构建时获取文章数据
// export async function getStaticProps() {
//   const allPostsData = getPosts();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }
