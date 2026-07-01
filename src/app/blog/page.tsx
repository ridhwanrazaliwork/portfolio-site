import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import PostCard from "@/components/blog/PostCard";

export default function BlogPage() {
  const files = readdirSync("src/content/posts").filter((f) =>
    f.endsWith(".mdx")
  );

  const posts = files
    .map((f) => {
      const source = readFileSync(`src/content/posts/${f}`, "utf-8");
      const { data } = matter(source);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: (data.tags as string[]) || [],
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div
      className="min-h-screen px-4 pt-28 pb-20"
      style={
        {
          "--font-sans": "var(--font-hanken)",
          "--font-mono": "var(--font-jetbrains)",
        } as React.CSSProperties
      }
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-foreground"
          style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em" }}
        >
          Blog
        </h1>
        <p className="text-[#a3a3a3] text-center max-w-xl mx-auto mb-14 text-base md:text-lg">
          Thoughts on data engineering, machine learning, and building things.
        </p>

        {posts.length === 0 && (
          <p className="text-center text-[#737373]">No posts yet. Coming soon!</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
