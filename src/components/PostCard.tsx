import Link from "next/link";

export default function PostCard({
  post,
}: {
  post: {
    frontMatter: {
      title: string;
      description: string;
      thumbnail: string;
      pubDatetime: string;
      readTime: number;
      postSlug: string;
      id: string;
    };
  };
}) {
  return (
    <Link href={`/posts/${post.frontMatter.id}`}>
      <div>
        111 {post.frontMatter.id}
        <img src={post.frontMatter.thumbnail} alt="postCardImage" />
        <div>
          <h2>{post.frontMatter.title}</h2>
          <p>{post.frontMatter.description}</p>
        </div>
        <div>
          <h2> 📅{post.frontMatter.pubDatetime}</h2>
          <p>⏰{post.frontMatter.readTime} min read</p>
        </div>
      </div>
    </Link>
  );
}
