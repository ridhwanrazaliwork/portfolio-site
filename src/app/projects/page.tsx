import Image from "next/image";
import type { Metadata } from "next";
import readmeragImg from "@/images/projects/ReadmeRag.png";
import gcpDataMgmtImg from "@/images/projects/gcp-data-mgmt.png";
import agenticMedicalImg from "@/images/projects/agentic-medical.png";
import gcpHealthcareImg from "@/images/projects/gcp-healthcare.png";
import lowlightYoloImg from "@/images/projects/lowlight-yolo.png";

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
    title: "ReadmeRag \u2014 RAG Chatbot for GitHub Projects",
    description:
      "A lightweight, zero-cost RAG (Retrieval-Augmented Generation) chatbot that answers questions about a developer's GitHub projects. It fetches README files from a GitHub profile, indexes them in a local vector database, and uses a free-tier LLM to answer questions.",
    tech: ["embeddings", "gemini-api", "rag", "llm", "chromadb", "openrouter", "litellm"],
    img: readmeragImg,
    github: "https://github.com/ridhwanrazaliwork/readmerag",
  },
  {
    title: "End-to-End GCP Big Data Healthcare Pipeline",
    description:
      "Led a team of 5 to build a GCP data lifecycle framework for chronic disease prediction, routing raw medical data through BigQuery to Looker Studio.",
    tech: ["GCP", "BigQuery", "Cloud Run", "Dataprep", "Looker Studio"],
    img: gcpHealthcareImg,
    github: "https://github.com/ridhwanrazaliwork/Google-Cloud-Big-Data-Project",
  },
  {
    title: "Agentic Medical AI Pipeline",
    description:
      "Web app using LangGraph state machines for medical data visualization and imputation, powered by Azure GPT-4 and local Qwen2.5.",
    tech: ["Python", "LangGraph", "Azure GPT-4.1", "Streamlit", "HuggingFace"],
    img: agenticMedicalImg,
    github: "https://github.com/ridhwanrazaliwork/Agentic_medical_AI_pipeline",
  },
  {
    title: "Google Cloud Data Management Project",
    description:
      "Led a team of 8 to architect an end-to-end GCP pipeline using PySpark and Hive on Dataproc to process hotel datasets for BI insights in Data Studio.",
    tech: ["GCP", "Dataproc", "PySpark", "Hive", "Looker Studio"],
    img: gcpDataMgmtImg,
    github: "https://github.com/ridhwanrazaliwork/Google_Cloud_Data_Management_Project",
  },
  {
    title: "Low-Light Object Detection Pipeline WebApp",
    description:
      "My capstone project: Web app with a sequential preprocessing pipeline (denoising + enhancement) and custom-tuned YOLO, achieving SOTA mAP50 on the ExDark dataset.",
    tech: ["Python", "YOLO", "Computer Vision", "Flask/Streamlit"],
    img: lowlightYoloImg,
    github: "https://github.com/ridhwanrazaliwork/LowLight-Object-Detection-Pipeline-WebApp",
  },
  {
    title: "DermAI — Skin Lesion Classification",
    description:
      "Flask-based web app for classifying skin lesions using ML models. Supports CNN, EfficientNet, and CNN+Metadata models. Upload images, choose models, and view predictions with confidence scores.",
    tech: ["Python", "Flask", "PyTorch", "Docker", "Google Cloud"],
    img: readmeragImg,  // TODO: replace with actual DermAI image
    github: "https://github.com/ridhwanrazaliwork/DermAI",
  },
];

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
        <p className="text-[#a3a3a3] text-center max-w-xl mx-auto mb-14 text-base md:text-lg">
          A selection of projects I have worked on.
        </p>

        <div className="grid md:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group glass-panel rounded-2xl p-7 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] hover:border-accent/30"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-neutral-900 shadow-md">
                <Image
                  src={project.img}
                  alt={project.title}
                  width={500}
                  height={281}
                  priority={i < 2}
                  sizes="(max-width: 768px) calc(100vw - 2rem), 500px"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 mt-4">
                <h3
                  className="text-lg font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {project.title}
                </h3>
                <p className="text-[#a3a3a3] text-sm mt-2 leading-relaxed flex-1">
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
