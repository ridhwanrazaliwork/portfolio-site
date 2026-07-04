"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Circle, Cloud, Brain, Code2, Database, BookOpen, Monitor, Cpu, Layers, Shield } from "lucide-react";
import profileImg from "@/images/home/ridhwan.webp";
import umLogo from "@/images/home/um-logo.webp";
import astroLogo from "@/images/home/astro.webp";
import valuelabsLogo from "@/images/home/valuelabs.webp";
import partTimeLogo from "@/images/home/part-time.webp";
import gcpLogo from "@/images/home/google-cloud.webp";
import udemyLogo from "@/images/home/udemy.webp";
import readmeragImg from "@/images/projects/ReadmeRag.webp";
import gcpDataMgmtImg from "@/images/projects/gcp-data-mgmt.webp";

const education = [
  {
    degree: "Master of Data Science",
    school: "Universiti Malaya",
    period: "2024 - Present",
    description:
      "Focus: Deep Learning, Big Data Analytics, and Cloud Computing. CGPA: 3.87/4.00.",
    thesis: "Low Light Object Detection with YOLO",
    coursework: "Machine Learning for Data Science, Big Data Applications & Analytics, Data Mining, Programming for Data Science",
    logo: umLogo,
    status: "Active",
  },
  {
    degree: "B.Sc. in Materials Science",
    school: "Universiti Malaya",
    period: "2018 - 2022",
    description:
      "Graduated with CGPA 3.47/4.00. Learnt Materials Science and Engineering principles, building foundational knowledge in scientific computing and data analysis.",
    logo: umLogo,
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
    logo: partTimeLogo,
    status: "Active (Part-time)",
  },
  {
    role: "Data Engineer",
    company: "Astro Sdn. Bhd. (via Valuelabs)",
    period: "2023 - 2024",
    description:
      "Migrated legacy auth system to SSO platform. Designed T-1 batch ETL pipelines using PySpark and AWS Glue. Built serverless orchestration with Step Functions and Lambda.",
    logo: valuelabsLogo,
    status: "Completed",
  },
  {
    role: "Trainee Data Engineer",
    company: "Astro Sdn. Bhd.",
    period: "2022 - 2023",
    description:
      "Maintained legacy authentication ETL pipelines. Resolved data integrity issues in account purge logic. Generated user engagement reports for business stakeholders.",
    logo: astroLogo,
    status: "Completed",
  },
];

const featuredProjects = [
  {
    title: "ReadmeRag — RAG Chatbot for GitHub Projects",
    description:
      "A RAG chatbot that lets anyone ask questions about my work by pulling from my GitHub READMEs. Instead of a static portfolio, visitors can query my projects, skills, and experience naturally.",
    tech: ["embeddings", "gemini-api", "rag", "llm", "chromadb", "openrouter", "litellm"],
    img: readmeragImg,
    github: "https://github.com/ridhwanrazaliwork/readmerag",
  },
  {
    title: "Google Cloud Data Management Project",
    description:
      "Led a team of 8 to architect an end-to-end data pipeline on GCP processing a hotel review dataset for business intelligence insights. Used PySpark and Hive for distributed processing on Dataproc.",
    tech: ["GCP", "Dataproc", "PySpark", "Hive", "Looker Studio"],
    img: gcpDataMgmtImg,
    github: "https://github.com/ridhwanrazaliwork/Google_Cloud_Data_Management_Project",
  },
];

const featuredCerts = [
  { name: "MLOps Bootcamp",
    issuer: "MLflow, Airflow, Docker, GitHub Actions CI/CD",
    year: "2026",
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-194396ca-2e55-49aa-8dbd-f89940196223/",
  },
  {
    name: "Google Cloud Data Analytics Certificate",
    issuer: "BigQuery, SQL on GCP, Looker Studio",
    year: "2025",
    logo: gcpLogo,
    link: "https://www.credly.com/badges/85768225-9c63-48ee-91f7-3b056c6116cc/public_url",
  },
  { name: "Data Engineering using AWS Data Analytics",
    issuer: "Udemy — S3, Glue, Redshift, Athena",
    year: "2023",
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-313c5b74-d2a7-48fa-9623-cb8bcc40299f/",
  },
];

const otherCerts = [
  {
    name: "The Complete Full-Stack Web Development Bootcamp", issuer: "Udemy",
    year: "2025",
    icon: <Monitor size={16} />,
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-df53cf97-6bfb-4112-80a9-08f91ed344ff/",
  },
  {
    name: "PyTorch for Deep Learning Bootcamp", issuer: "Zero to Mastery",
    year: "2025",
    icon: <Cpu size={16} />,
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-8f34eab4-ca85-4563-9143-3d418709075b/",
  },
  {
    name: "TensorFlow for Deep Learning Bootcamp", issuer: "Zero to Mastery",
    year: "2025",
    icon: <Layers size={16} />,
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-1679c1f9-0e48-4a7a-bc2f-34302e60ab2b/",
  },
  {
    name: "Mastering React & Node.js Firebase Authentication", issuer: "Udemy",
    year: "2025",
    icon: <Shield size={16} />,
    logo: udemyLogo,
    link: "https://www.udemy.com/certificate/UC-c006a6db-1f94-4a53-9a90-082b35a9615d/",
  },
];

const techPillars = [
  { icon: <Cloud size={20} />, title: "Cloud & Data Engineering", skills: ["AWS", "GCP", "Azure", "Spark", "Hadoop", "Hive", "Dataproc", "Glue"] },
  { icon: <Brain size={20} />, title: "AI & Machine Learning", skills: ["PyTorch", "TensorFlow", "MLflow", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Python", "R"] },
  { icon: <Code2 size={20} />, title: "Full-Stack & APIs", skills: ["Next.js", "FastAPI", "Node.js", "TypeScript", "React", "Tailwind CSS", "JavaScript", "HTML5", "Streamlit"] },
  { icon: <Database size={20} />, title: "Databases & DevOps", skills: ["PostgreSQL", "MongoDB", "Docker", "DynamoDB", "MSSQL", "MySQL", "Supabase", "GitHub Actions", "Git", "Jira", "Bitbucket"] },
];

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

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`glass-panel p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] hover:border-accent/30 ${className}`}
    >
      {children}
    </div>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[var(--glass-border)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-accent/20"
      style={{ background: "var(--glass-bg)" }}
    >
      <span className="shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

function ContactPill({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/20 text-accent transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-accent/30 hover:shadow-[0_0_15px_var(--accent-glow)]"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const currentItems = activeTab === "work" ? work : education;
  const currentLabel = activeTab === "work" ? "Experience" : "Education";

  const age = Math.floor(
    (new Date().getTime() - new Date("1999-10-25").getTime()) / 31557600000
  );

  return (
    <div
      style={{
        "--font-sans": "var(--font-hanken)",
        "--font-mono": "var(--font-jetbrains)",
      } as React.CSSProperties}
    >
      {/* ─── HERO BENTO ─── */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="glass-panel p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)] hover:border-accent/30 relative">
            {/* <div
              className="absolute inset-0 pointer-events-none z-0 rounded-[15px]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 33px, var(--glass-border) 33.6px, var(--glass-border) 34.6px),
                  repeating-linear-gradient(60deg, transparent, transparent 29px, var(--glass-border) 29px, var(--glass-border) 30px),
                  repeating-linear-gradient(120deg, transparent, transparent 29px, var(--glass-border) 29px, var(--glass-border) 30px)
                `,
              }}
            /> */}
            <div className="group relative w-32 h-32 md:w-40 md:h-40 shrink-0">
              <div
                style={{
                  borderColor: "var(--accent) var(--accent) var(--accent) transparent",
                  width: "calc(100% + 6px)", height: "calc(100% + 6px)",
                  top: "-3px", left: "-3px",
                }}
                className="absolute rounded-full border transition-transform duration-[1.5s] ease-in-out group-hover:rotate-[360deg]"
              />
              <div
                style={{
                  borderColor: "var(--accent) transparent var(--accent) var(--accent)",
                  width: "calc(100% + 12px)", height: "calc(100% + 12px)",
                  top: "-6px", left: "-6px",
                }}
                className="absolute rounded-full border transition-transform duration-[1.5s] ease-in-out group-hover:-rotate-[360deg]"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/[0.08] shadow-lg">
                <Image
                  src={profileImg}
                  alt="Ridhwan"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
                style={{ letterSpacing: "-0.02em" }}
              >
                Hi, I&apos;m <span className="text-accent">Ridhwan</span>
              </h1>
              <p className="mt-2 text-lg md:text-xl text-[#a3a3a3]">
                Data Engineer with 2 years experience, finishing MSc in Data Science. Looking for data or ML/AI engineering roles.
              </p>
              <p className="mt-1 text-sm text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                {age}&nbsp;years old &middot; Kuala Lumpur, MY
              </p>
              <div
                className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs overflow-hidden max-w-[260px]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                <span className="text-accent shrink-0"><BookOpen size={14} /></span>
                <div className="overflow-hidden whitespace-nowrap">
                  <span className="inline-block animate-marquee">
                    Studying: Azure certifications &nbsp;&nbsp;·&nbsp;&nbsp; Studying: Azure certifications
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <ContactPill href="mailto:ridhwanrazaliwork@gmail.com" label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </ContactPill>
                <ContactPill href="https://linkedin.com/in/ridhwan-bin-razali" label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </ContactPill>
                <ContactPill href="https://github.com/ridhwanrazaliwork" label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </ContactPill>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/20 text-accent text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-accent/30 hover:shadow-[0_0_15px_var(--accent-glow)]"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Resume
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
            <StatChip icon={<MapPin size={16} />} label="Location" value="Kuala Lumpur, MY" />
            <StatChip icon={<GraduationCap size={16} />} label="Education" value="Universiti Malaya" />
            <StatChip icon={<Briefcase size={16} />} label="Current Role" value="Postgraduate Student" />
            <StatChip icon={<Circle size={14} fill="var(--accent)" stroke="var(--accent)" />} label="Availability" value="Open to new roles" />
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Tech Stack
          </h2>
          <p className="text-[#a3a3a3] text-center max-w-xl mx-auto text-base md:text-lg">
            Languages, tools, and technologies I work with.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {techPillars.map((p) => (
              <BentoCard key={p.title}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{p.icon}</span>
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <TechBadge key={s} label={s} />
                  ))}
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORK & EDUCATION ─── */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Work &amp; Education
          </h2>
          <p className="text-[#a3a3a3] text-center max-w-xl mx-auto text-base md:text-lg">
            My academic background and professional experience.
          </p>

          <BentoCard>
            <div className="flex justify-center mb-8">
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

            <div>
              <span
                className="text-xs font-medium uppercase tracking-wider text-[#737373] block mb-4"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {"\u276F"} {currentLabel}
              </span>
              <div className="space-y-4">
                {currentItems.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-200 hover:border-accent/20"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        {"logo" in item && item.logo ? (
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 bg-white/[0.04] border border-[var(--glass-border)] flex items-center justify-center">
                              <Image src={item.logo} alt={"company" in item ? item.company : item.school} width={28} height={28} className="object-contain" style={{ width: "auto", height: "auto" }} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {"role" in item ? item.role : item.degree}
                              </h3>
                              <p className="text-[#a3a3a3] text-sm mt-0.5">
                                {"company" in item ? item.company : item.school}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-foreground">
                              {"role" in item ? item.role : item.degree}
                            </h3>
                            <p className="text-[#a3a3a3] text-sm mt-0.5">
                              {"company" in item ? item.company : item.school}
                            </p>
                          </>
                        )}
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
                    {"thesis" in item && item.thesis && (
                      <p className="text-[#a3a3a3] text-sm mt-2">
                        <span className="text-foreground/80 font-medium">Thesis:</span> {item.thesis}
                      </p>
                    )}
                    {"coursework" in item && item.coursework && (
                      <p className="text-[#a3a3a3] text-xs mt-1 leading-relaxed">
                        <span className="text-foreground/80 font-medium">Key coursework:</span> {item.coursework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Projects
          </h2>
          <p className="text-[#a3a3a3] text-center max-w-xl mx-auto text-base md:text-lg">
            Key projects from my data science and engineering journey.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <BentoCard key={i}>
                <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-neutral-900 shadow-md mb-4">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
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
              </BentoCard>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/projects" className="glass-button inline-block">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Certifications
          </h2>
          <p className="text-[#a3a3a3] text-center max-w-xl mx-auto text-base md:text-lg">
            Professional certifications and credentials.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredCerts.map((cert, i) => (
              <BentoCard key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-white/[0.04] border border-[var(--glass-border)] flex items-center justify-center">
                  <Image src={cert.logo} alt={cert.name} width={40} height={40} className="object-contain p-1" style={{ width: "auto", height: "auto" }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {cert.name}
                  </h3>
                  <p className="text-[#a3a3a3] text-sm mt-1">
                    {cert.issuer}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className="inline-block text-[11px] text-[#737373] bg-white/[0.06] px-2.5 py-1 rounded border border-white/[0.06]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {cert.year}
                    </span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-accent hover:underline"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>

          <BentoCard>
            <h3
              className="text-sm font-semibold text-foreground mb-5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Other Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherCerts.map((cert, i) => (
                <div
                  key={i}
                  className="glass-panel p-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--accent-glow)] hover:border-accent/30"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[#737373]">{cert.icon}</span>
                    <span className="text-[10px] text-[#737373] shrink-0" style={{ fontFamily: "var(--font-jetbrains)" }}>({cert.year})</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-snug mb-1.5">{cert.name}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-accent hover:underline"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ─── FOOTER CONTACT ─── */}
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
                {/* <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwanrazaliwork@gmail.com</span> */}
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
                {/* <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwan-bin-razali</span> */}
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
                {/* <span className="text-sm text-foreground group-hover:text-accent transition-colors">ridhwanrazaliwork</span> */}
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
  );
}
