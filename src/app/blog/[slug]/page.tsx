import { readdirSync, readFileSync } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";

interface Props {
  params: { slug: string };
}

const components = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4 my-6 text-sm" {...props} />
  ),
  code: ({ className, children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code className={className} {...props}>{children}</code>
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className={`rounded-xl ${props.className || ""}`} {...props} />
  ),
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let source: string;
  try {
    source = readFileSync(`src/content/posts/${slug}.mdx`, "utf-8");
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          <p className="text-muted-foreground mt-2">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-block mt-6 text-accent hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { content, data } = matter(source);

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
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          ← Back to Blog
        </Link>

        <header className="mt-6 mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            {data.title as string}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <time
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {new Date(data.date as string).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {data.tags && (
              <div className="flex flex-wrap gap-1.5">
                {(data.tags as string[]).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent/90 border border-accent/20"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="prose prose-invert max-w-none"
          style={
            {
              "--tw-prose-body": "#a3a3a3",
              "--tw-prose-headings": "#ffffff",
              "--tw-prose-links": "var(--accent)",
              "--tw-prose-code": "#ffffff",
              "--tw-prose-pre-bg": "transparent",
            } as React.CSSProperties
          }
        >
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const files = readdirSync("src/content/posts").filter((f) =>
    f.endsWith(".mdx")
  );
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}
