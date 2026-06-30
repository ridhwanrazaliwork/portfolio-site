"use client";

import { useState } from "react";
import Link from "next/link";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import profileImg from "@/images/home/ridhwan_hi.jpeg";

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
    title: "EchoLab — AI-Powered Speaking Coach Playground",
    description:
      "An ongoing full-stack interview preparation app providing real-time camera and audio analysis. Uses Mediapipe for computer vision and STT/TTS pipelines for speech analysis. Features AI agent-powered resume checking and rewriting.",
    tech: ["Next.js", "Firebase", "Mediapipe", "Azure OpenAI"],
    github: "https://github.com/ridhwanrazaliwork/EchoLab",
  },
  {
    title: "Google Cloud Data Management Project",
    description:
      "Led a team of 8 to architect an end-to-end data pipeline on GCP processing a hotel review dataset for business intelligence insights. Used PySpark and Hive for distributed processing on Dataproc.",
    tech: ["GCP", "Dataproc", "PySpark", "Hive", "Looker Studio"],
    github: "https://github.com/ridhwanrazaliwork/Google_Cloud_Data_Management_Project",
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

        <section id="work-education" className="py-24 px-4">
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
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent hover:underline transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {"GitHub ↗"}
                  </a>
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

        {/* <section className="py-24 px-4 bg-muted/30">
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
        </section> */}

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

        <footer className="relative py-32 px-4 overflow-hidden">

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

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:ridhwanrazaliwork@gmail.com"
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent transition-all duration-200 hover:bg-accent/10 hover:border-accent/30 hover:shadow-[0_0_25px_var(--accent-glow)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>email</span>
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwanrazaliwork@gmail.com</span>
                </a>

                <a
                  href="https://linkedin.com/in/ridhwan-bin-razali"
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent transition-all duration-200 hover:bg-accent/10 hover:border-accent/30 hover:shadow-[0_0_25px_var(--accent-glow)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>linkedin</span>
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwan-bin-razali</span>
                </a>

                <a
                  href="https://github.com/ridhwanrazaliwork"
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent transition-all duration-200 hover:bg-accent/10 hover:border-accent/30 hover:shadow-[0_0_25px_var(--accent-glow)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>github</span>
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwanrazaliwork</span>
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
