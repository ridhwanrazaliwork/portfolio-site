import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

export default function PostCard({ slug, title, description, date, tags }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="glass-panel p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] hover:border-accent/30">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[11px] text-muted-foreground"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
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
        <h3
          className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors"
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
