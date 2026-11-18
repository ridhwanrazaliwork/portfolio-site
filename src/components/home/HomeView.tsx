import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Download,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";
import profileImg from "@/images/home/ridhwan.webp";
import {
  courseCompletions,
  education,
  featuredProjects,
  proctoredCerts,
  techPillars,
  work,
} from "@/content/home";

const EMAIL = "ridhwanrazaliwork@gmail.com";
const LINKEDIN = "https://linkedin.com/in/ridhwan-bin-razali";
const GITHUB = "https://github.com/ridhwanrazaliwork";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const OUTER_STARS = [
  { angle: 0, size: 10, opacity: 0.9 },
  { angle: 58, size: 7, opacity: 0.55 },
  { angle: 118, size: 9, opacity: 0.75 },
  { angle: 176, size: 6, opacity: 0.45 },
  { angle: 238, size: 9, opacity: 0.68 },
  { angle: 300, size: 7, opacity: 0.55 },
];

const INNER_STARS = [
  { angle: 28, size: 6, opacity: 0.45 },
  { angle: 122, size: 8, opacity: 0.65 },
  { angle: 206, size: 5, opacity: 0.4 },
  { angle: 300, size: 7, opacity: 0.55 },
];

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-10 md:mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-accent/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-2">
          {index} — {label}
        </span>
      </div>
      <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-fg-1 md:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-fg-2">
          {description}
        </p>
      ) : null}
    </header>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-[var(--chip-bg)] px-2 py-1 font-mono text-[11px] leading-none text-fg-2">
      {children}
    </span>
  );
}

function Metric({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[11px] leading-none text-accent">
      {children}
    </span>
  );
}

export default function HomeView() {
  return (
    <div
      style={
        {
          fontFamily: "var(--font-hanken)",
          "--font-sans": "var(--font-hanken)",
          "--font-mono": "var(--font-jetbrains)",
        } as CSSProperties
      }
    >
      {/* Soft vignette so content passing through the brightest part of the
          starfield stays readable. Sits above the canvas, below the content. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-[9] h-52"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 60%, transparent 100%)",
        }}
      />

      {/* ─── HERO ─── */}
      <section className="px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_15rem] md:gap-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-2">
              Ridhwan Bin Razali · Data Engineer
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[2.1rem] leading-[1.06] font-semibold tracking-[-0.03em] text-fg-1 md:text-[3.1rem]">
              I build the <span className="text-accent">data foundations</span>{" "}
              behind analytics and AI.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-2 md:text-base">
              2+ years on AWS and GCP — serverless pipelines, lakehouse
              migrations, and 60% lower cloud cost. MSc Data Science at
              Universiti Malaya.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                download="RidhwanRazali_Resume_2026.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Resume
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-2.5 text-[13px] font-medium text-fg-1 transition-colors hover:border-accent/40"
              >
                <Mail size={15} />
                Email
              </a>
              <span aria-hidden className="mx-1 h-5 w-px bg-[var(--hairline)]" />
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] text-fg-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] text-fg-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <GithubIcon size={16} />
              </a>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Kuala Lumpur, MY
              </span>
              <span aria-hidden>·</span>
              <span>Open to data engineering roles</span>
            </p>
          </div>

          <div className="order-first justify-self-center md:order-none">
            <div className="relative w-44 md:w-60">
              <div aria-hidden className="photo-orbit photo-orbit--back">
                <div
                  className="photo-ring photo-ring--reverse"
                  style={{ "--dur": "34s" } as CSSProperties}
                >
                  {INNER_STARS.map((star) => (
                    <span
                      key={`inner-${star.angle}`}
                      className="photo-star photo-star--inner"
                      style={
                        {
                          "--a": `${star.angle}deg`,
                          "--size": `${star.size}px`,
                          "--o": String(star.opacity),
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-[var(--hairline)]">
                <Image
                  src={profileImg}
                  alt="Ridhwan Bin Razali"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 240px"
                  className="object-cover object-top"
                />
              </div>

              <div aria-hidden className="photo-orbit photo-orbit--front">
                <div
                  className="photo-ring"
                  style={{ "--dur": "48s" } as CSSProperties}
                >
                  {OUTER_STARS.map((star) => (
                    <span
                      key={`outer-${star.angle}`}
                      className="photo-star"
                      style={
                        {
                          "--a": `${star.angle}deg`,
                          "--size": `${star.size}px`,
                          "--o": String(star.opacity),
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="01"
            label="Stack"
            title="Tools I reach for"
            description="Languages, platforms, and frameworks I use to move data from source to decision."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {techPillars.map((pillar) => (
              <Panel key={pillar.title} className="p-5">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="text-accent">
                    <pillar.icon size={17} />
                  </span>
                  <h3 className="text-[14px] font-semibold text-fg-1">
                    {pillar.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pillar.skills.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="02"
            label="Experience"
            title="Where I've shipped data platforms"
            description="Production pipelines, migrations, and the operational work that keeps reporting trustworthy."
          />
          <div className="space-y-4">
            {work.map((job) => {
              const isCurrent = job.status.includes("Active");
              return (
                <Panel key={job.company} className="p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="flex items-start gap-3">
                      {job.logo ? (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--chip-bg)]">
                          <Image
                            src={job.logo}
                            alt={job.company}
                            width={36}
                            height={36}
                            className="h-auto w-auto object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--hairline)] text-fg-3">
                          <Briefcase size={16} />
                        </div>
                      )}
                      <div>
                        <h3 className="text-[15px] font-semibold leading-snug text-fg-1">
                          {job.role}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-fg-2">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-1.5 md:items-end">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                        {job.period}
                      </span>
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          Active
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {job.metrics ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.metrics.map((metric) => (
                        <Metric key={metric}>{metric}</Metric>
                      ))}
                    </div>
                  ) : null}

                  <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
                    {job.description}
                  </p>

                  {job.highlights || job.stack ? (
                    <details className="group mt-4 border-t border-[var(--hairline)] pt-3">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3 transition-colors hover:text-fg-1">
                        <ChevronDown
                          size={13}
                          className="transition-transform group-open:rotate-180"
                        />
                        Details
                        {job.highlights
                          ? ` · ${job.highlights.length} highlights`
                          : ""}
                      </summary>

                      {job.highlights ? (
                        <ul className="mt-3 space-y-1.5">
                          {job.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-2.5 text-[13.5px] leading-relaxed text-fg-2"
                            >
                              <span
                                aria-hidden
                                className="mt-2 h-px w-2 shrink-0 bg-fg-3"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {job.stack ? (
                        <div className="mt-4 grid gap-1.5 border-t border-[var(--hairline)] pt-3 sm:grid-cols-[6rem_1fr] sm:gap-x-4">
                          {job.stack.map((group) => (
                            <div key={group.label} className="contents">
                              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                                {group.label}
                              </span>
                              <span className="text-[12.5px] leading-relaxed text-fg-2">
                                {group.items.join(" · ")}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </details>
                  ) : null}
                </Panel>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="03"
            label="Education"
            title="Academic foundation"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <Panel key={item.degree} className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {item.logo ? (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--chip-bg)]">
                        <Image
                          src={item.logo}
                          alt={item.school}
                          width={36}
                          height={36}
                          className="h-auto w-auto object-contain"
                        />
                      </div>
                    ) : null}
                    <div>
                      <h3 className="text-[14.5px] font-semibold leading-snug text-fg-1">
                        {item.degree}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-fg-2">
                        {item.school}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                    {item.period}
                  </span>
                </div>

                <p className="mt-4 text-[13.5px] leading-relaxed text-fg-2">
                  {item.description}
                </p>

                {item.thesis ? (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-fg-3">
                    <span className="text-fg-2">Thesis:</span> {item.thesis}
                  </p>
                ) : null}
                {item.coursework ? (
                  <p className="mt-2 text-[12px] leading-relaxed text-fg-3">
                    <span className="text-fg-2">Coursework:</span>{" "}
                    {item.coursework}
                  </p>
                ) : null}
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="04"
            label="Projects"
            title="Selected work"
            description="Data platforms and applied ML projects, with the numbers that came out of them."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Panel key={project.title} className="overflow-hidden p-5">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--chip-bg)]">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-fg-1">
                  {project.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fg-2">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-opacity hover:opacity-70"
                >
                  GitHub
                  <ArrowUpRight size={13} />
                </a>
              </Panel>
            ))}
          </div>

          <div className="mt-6">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-2.5 text-[13px] font-medium text-fg-1 transition-colors hover:border-accent/40"
            >
              All projects
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="05"
            label="Certifications"
            title="Credentials"
            description="Proctored certifications first, then courses and specialisations."
          />

          <div className="grid gap-3 md:grid-cols-3">
            {proctoredCerts.map((cert) => (
              <Panel key={cert.name} className="flex flex-col p-4">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-[var(--hairline)] bg-[var(--chip-bg)]">
                  {cert.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.logoUrl}
                      alt={`${cert.name} badge`}
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-accent">
                      <cert.icon size={16} />
                    </span>
                  )}
                </div>
                <h3 className="mt-3 flex-1 text-[13px] font-medium leading-snug text-fg-1">
                  {cert.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
                  {cert.issuer}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-fg-3">
                    {cert.year}
                  </span>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent hover:underline"
                    >
                      Verify
                      <ExternalLink size={11} />
                    </a>
                  ) : null}
                </div>
              </Panel>
            ))}
          </div>

          <h3 className="mt-10 mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">
            Courses & specialisations
          </h3>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {courseCompletions.map((cert) => (
              <Panel key={cert.name} className="p-3.5">
                <p className="text-[12.5px] leading-snug text-fg-1">
                  {cert.name}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-[10px] text-fg-3">
                    {cert.issuer} · {cert.year}
                  </span>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-accent hover:underline"
                    >
                      Verify
                    </a>
                  ) : null}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <footer className="border-t border-[var(--hairline)] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-fg-1 md:text-3xl">
                Let&apos;s connect
              </h2>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-fg-2">
                Open to data engineering roles and interesting pipeline
                problems. Based in Kuala Lumpur.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 font-mono text-[12.5px] text-accent hover:underline"
              >
                {EMAIL}
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3 py-2 text-[12px] text-fg-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Mail size={14} />
                Email
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3 py-2 text-[12px] text-fg-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3 py-2 text-[12px] text-fg-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-[var(--hairline)] pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3 md:flex-row md:items-center md:justify-between">
            <span className="inline-flex items-center gap-2">
              <MapPin size={12} />
              Kuala Lumpur, Malaysia
            </span>
            <span>
              © {new Date().getFullYear()} Ridhwan Bin Razali · Built with
              Next.js
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
