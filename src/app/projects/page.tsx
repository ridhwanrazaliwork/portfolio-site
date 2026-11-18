import Image from "next/image";
import type { Metadata } from "next";
import readmeragImg from "@/images/projects/ReadmeRag.webp";
import gcpDataMgmtImg from "@/images/projects/gcp-data-mgmt.webp";
import agenticMedicalImg from "@/images/projects/agentic-medical.webp";
import gcpHealthcareImg from "@/images/projects/gcp-healthcare.webp";
import lowlightYoloImg from "@/images/projects/lowlight-yolo.webp";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore projects by Ridhwan.",
  openGraph: {
    title: "Projects | Ridhwan",
    description: "Explore projects by Ridhwan.",
  },
};

const projects = [
  {
    title: "Google Cloud Data Management Project",
    description:
      "Led a team of 8 to architect an end-to-end GCP pipeline with PySpark and Hive on Dataproc, processing hotel reviews for BI insights — PySpark ran 40.3% faster on identical workloads, with 78% fewer missing values.",
    tech: ["GCP", "Dataproc", "PySpark", "Hive", "Looker Studio"],
    category: "Data Engineering",
    img: gcpDataMgmtImg,
    github: "https://github.com/ridhwanrazaliwork/google-cloud-data-management-project",
  },
  {
    title: "End-to-End GCP Big Data Healthcare Pipeline",
    description:
      "Led a team of 5 to build a serverless GCP data lifecycle framework for chronic disease prediction, holding average query latency under 0.26s at a 97.45% success rate.",
    tech: ["GCP", "BigQuery", "Cloud Functions", "Dataprep", "Looker Studio"],
    category: "Data Engineering",
    img: gcpHealthcareImg,
    github: "https://github.com/ridhwanrazaliwork/google-cloud-big-data-project",
  },
  {
    title: "ReadmeRag \u2014 RAG Chatbot for GitHub Projects",
    description:
      "A lightweight, zero-cost RAG (Retrieval-Augmented Generation) chatbot that answers questions about a developer's GitHub projects. It fetches README files from a GitHub profile, indexes them in a local vector database, and uses a free-tier LLM to answer questions.",
    tech: ["embeddings", "gemini-api", "rag", "llm", "chromadb", "openrouter", "litellm"],
    category: "AI & ML",
    img: readmeragImg,
    github: "https://github.com/ridhwanrazaliwork/readmerag",
  },
  {
    title: "Agentic Medical AI Pipeline",
    description:
      "Web app using LangGraph state machines for medical data visualization and imputation, powered by Azure GPT-4 and local Qwen2.5.",
    tech: ["Python", "LangGraph", "Azure GPT-4.1", "Streamlit", "HuggingFace"],
    category: "AI & ML",
    img: agenticMedicalImg,
    github: "https://github.com/ridhwanrazaliwork/agentic-medical-ai-pipeline",
  },
  {
    title: "Low-Light Object Detection Pipeline WebApp",
    description:
      "MSc final-year project: a preprocessing pipeline (denoising + enhancement) with custom-tuned YOLO on the ExDark benchmark, delivering a 19.9% performance boost over baseline.",
    tech: ["Python", "YOLO", "Computer Vision", "Flask/Streamlit"],
    category: "AI & ML",
    img: lowlightYoloImg,
    github: "https://github.com/ridhwanrazaliwork/fyp-lowLight-object-detection-pipeline-webapp",
  },
  {
    title: "DermAI \u2014 Skin Lesion Classification",
    description:
      "Flask-based web app for classifying skin lesions using ML models. Supports CNN, EfficientNet, and CNN+Metadata models. Upload images, choose models, and view predictions with confidence scores.",
    tech: ["Python", "Flask", "PyTorch", "Docker", "Google Cloud"],
    category: "AI & ML",
    img: null,
    github: "https://github.com/ridhwanrazaliwork/skinlesionclassificationdermai",
  },
];

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] font-medium text-muted-foreground bg-white/[0.06] border border-white/[0.06]"
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-4 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-foreground"
          style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em" }}
        >
          Projects
        </h1>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-base md:text-lg">
          Data engineering work and applied AI/ML projects.
        </p>

        <div className="grid md:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group glass-panel rounded-2xl p-7 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] hover:border-accent/30"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-neutral-900 shadow-md">
                {project.img ? (
                  <Image
                    src={project.img}
                    alt={project.title}
                    width={500}
                    height={281}
                    priority={i < 2}
                    sizes="(max-width: 768px) calc(100vw - 2rem), 500px"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-5xl font-bold text-foreground/25"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      DA
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 mt-4">
                <span
                  className="text-[10px] font-medium uppercase tracking-wider text-accent"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-lg font-semibold text-foreground mt-1"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 transition-all w-fit"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {"\u{1F517} GitHub"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
