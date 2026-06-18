"use client";

import { useState } from "react";
import Link from "next/link";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import profileImg from "@/images/llama_hi.png";
import footerSvg from "@/images/llama_footer.png";

const education = [
  {
    degree: "Master of Data Science",
    school: "Universiti Malaya",
    period: "2024 - Present",
    description:
      "Focus: Deep Learning, Big Data Analytics, and Cloud Computing. CGPA: 3.87/4.00.",
    status: "Active",
  },
  {
    degree: "B.Sc. in Materials Science",
    school: "Universiti Malaya",
    period: "2018 - 2022",
    description:
      "Graduated with CGPA 3.47/4.00. Built foundational knowledge in scientific computing and data analysis.",
    status: "Completed",
  },
];

const work = [
  {
    role: "Freelance AI Model Response Evaluator",
    company: "Outlier.ai / Alignerr",
    period: "2024 - Present",
    description:
      "Evaluating AI-generated responses across diverse LLM projects, contributing to model training for Malay language and technical/code prompts.",
    status: "Active",
  },
  {
    role: "Data Engineer",
    company: "Astro Sdn. Bhd. (via Valuelabs)",
    period: "2023 - 2024",
    description:
      "Migrated legacy auth system to SSO platform. Designed T-1 batch ETL pipelines using PySpark and AWS Glue. Built serverless orchestration with Step Functions and Lambda.",
    status: "Completed",
  },
  {
    role: "Trainee Data Engineer",
    company: "Astro Sdn. Bhd.",
    period: "2022 - 2023",
    description:
      "Maintained legacy authentication ETL pipelines. Resolved data integrity issues in account purge logic. Generated user engagement reports for business stakeholders.",
    status: "Completed",
  },
];

const featuredProjects = [
  {
    title: "Low-Light Object Detection with YOLO",
    description:
      "Investigated object detection degradation in low-light using ExDARK dataset across 12 classes. Data-centric optimization improved mAP50 by +19.9%, achieving SOTA 0.837 mAP50.",
    tech: ["Python", "YOLO v8-v12", "Computer Vision"],
  },
  {
    title: "Google Cloud Health Analytics Pipeline",
    description:
      "Led 4-person team building an end-to-end cloud pipeline for diabetes risk prediction. Serverless ingestion with Cloud Run, Cloud Dataprep, and BigQuery analytics.",
    tech: ["GCP", "BigQuery", "Looker Studio"],
  },
];

const achievements = [
  {
    title: "SOTA on ExDARK Dataset",
    description:
      "Achieved state-of-the-art 0.837 mAP50 on ExDARK benchmark through multi-phase ablation study and data-centric optimization strategies.",
    year: "2025",
  },
  {
    title: "Master's CGPA 3.87",
    description:
      "Maintained top-tier academic performance in Master of Data Science program at Universiti Malaya.",
    year: "2025",
  },
];

const certifications = [
  {
    name: "MLOps Bootcamp",
    issuer: "MLflow, Airflow, Docker, GitHub Actions CI/CD",
    year: "2026",
  },
  {
    name: "Google Cloud Data Analytics Certificate",
    issuer: "BigQuery, SQL on GCP, Looker Studio",
    year: "2025",
  },
  {
    name: "Data Engineering using AWS Data Analytics",
    issuer: "Udemy \u2014 S3, Glue, Redshift, Athena",
    year: "2023",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-foreground"
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#a3a3a3] text-center max-w-xl mx-auto mb-16 text-base md:text-lg">
      {children}
    </p>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase"
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-accent" : "text-foreground/30"
        }`}
        style={!isActive ? { backgroundColor: "#737373" } : undefined}
      />
      {status}
    </span>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] font-medium text-[#a3a3a3] bg-white/[0.06] border border-white/[0.06]"
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      {label}
    </span>
  );
}

export default function TestPage() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const currentItems = activeTab === "work" ? work : education;
  const currentLabel = activeTab === "work" ? "Experience" : "Education";

  const age = Math.floor(
    (new Date().getTime() - new Date("1999-10-25").getTime()) /
      31557600000
  );

  return (
    <div>
      <div
        style={{
          "--font-sans": "var(--font-hanken)",
          "--font-syne": "var(--font-hanken)",
          "--font-mono": "var(--font-jetbrains)",
        } as React.CSSProperties}
      >
<section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/[0.08] mb-8 shadow-lg">
            <img
              src={profileImg.src}
              alt="Ridhwan"
              className="w-full h-full object-cover"
            />
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-4xl leading-tight text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Hi, I&apos;m <span className="text-accent">Ridhwan</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-[#a3a3a3] max-w-xl">
            I&apos;m {age} years old from Kuala Lumpur (MY).
          </p>
          <p className="mt-1 text-lg md:text-xl text-[#a3a3a3] max-w-xl">
            A Materials Science graduate and Data Science student from{" "}
            <span className="text-foreground">Universiti Malaya</span>.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <button
              className="glass-button text-base pointer-events-auto"
              onClick={() =>
                document
                  .getElementById("work-education")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Journey
            </button>
            <span
              className="text-xs text-[#737373] pointer-events-auto"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
            </span>
          </div>
        </section>

        <section id="work-education" className="py-24 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <SectionHeading>Work &amp; Education</SectionHeading>
            <SectionSubtitle>
              My academic background and professional experience.
            </SectionSubtitle>

            <div className="flex justify-center mb-10">
              <div className="glass-pill inline-flex p-1 gap-1">
                <button
                  onClick={() => setActiveTab("work")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "work"
                      ? "bg-white/20 text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Work
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "education"
                      ? "bg-white/20 text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  Education
                </button>
              </div>
            </div>

            <div className="glass-panel">
              <div className="px-6 py-3 border-b border-white/[0.05]">
                <span
                  className="text-xs font-medium uppercase tracking-wider text-[#737373]"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {"\u276F"} {currentLabel}
                </span>
              </div>
              {currentItems.map((item, i) => (
                <div
                  key={i}
                  className="p-6 border-t border-white/[0.05] first:border-t-0"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-foreground">
                        {"role" in item ? item.role : item.degree}
                      </h3>
                      <p className="text-[#a3a3a3] text-sm mt-0.5">
                        {"company" in item ? item.company : item.school}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <StatusBadge status={item.status} />
                      <span
                        className="text-[11px] text-[#737373]"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed">
                    {"\u276F"} {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading>Projects</SectionHeading>
            <SectionSubtitle>
              Key projects from my data science and engineering journey.
            </SectionSubtitle>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {featuredProjects.map((project, i) => (
                <div key={i} className="glass-panel p-6 md:p-8">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <span
                      className="text-accent font-bold text-xs tracking-widest"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {i === 0 ? "CV" : "DE"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-[#a3a3a3] mt-3 text-sm leading-relaxed">
                    {"\u276F"} {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/projects" className="glass-button inline-block">
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <SectionHeading>Achievements</SectionHeading>
            <SectionSubtitle>
              Milestones and recognition from my journey.
            </SectionSubtitle>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((item, i) => (
                <div key={i} className="glass-panel p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl shrink-0">
                      {i === 0 ? "\uD83C\uDFC6" : "\uD83C\uDF1F"}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <span
                        className="text-[11px] text-[#737373]"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed">
                    {"\u276F"} {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading>Certifications</SectionHeading>
            <SectionSubtitle>
              Professional certifications and credentials.
            </SectionSubtitle>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="glass-panel p-6 md:p-8 flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <span
                      className="text-accent font-bold text-[10px] tracking-wider"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      CERT
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      {cert.name}
                    </h3>
                    <p className="text-[#a3a3a3] text-sm mt-1">
                      {cert.issuer}
                    </p>
                    <span
                      className="inline-block mt-2 text-[11px] text-[#737373] bg-white/[0.06] px-2.5 py-1 rounded border border-white/[0.06]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-32 px-4 overflow-hidden bg-muted/30">
          <img
            src={footerSvg.src}
            alt=""
            className="absolute bottom-6 right-6 w-20 h-20 md:w-24 md:h-24 opacity-[0.5] pointer-events-none"
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              Let&apos;s Connect
            </h2>

            <div className="flex flex-col items-center gap-4 text-[#a3a3a3] mb-10">
              <p className="text-lg font-semibold text-foreground">
                Ridhwan Bin Razali
              </p>
              <p className="text-sm">
                ridhwanrazaliwork@gmail.com | +60 16 415 2510
              </p>
              <div className="flex gap-8 mt-2">
                <a
                  href="https://linkedin.com/in/ridhwan-bin-razali"
                  className="text-accent text-sm hover:underline transition-all"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin
                </a>
                <a
                  href="https://github.com/ridhwanrazaliwork"
                  className="text-accent text-sm hover:underline transition-all"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github
                </a>
              </div>
            </div>

            <div className="border-t border-white/[0.05] pt-8 mt-8">
              <p
                className="text-xs text-[#737373]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {"\u00A9"} {new Date().getFullYear()} Ridhwan Bin Razali.
                Built with Next.js.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
