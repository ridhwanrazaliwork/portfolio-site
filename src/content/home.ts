import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  Layers,
  Monitor,
  Shield,
} from "lucide-react";

import umLogo from "@/images/home/um-logo.webp";
import astroLogo from "@/images/home/astro.webp";
import valuelabsLogo from "@/images/home/valuelabs.webp";
import partTimeLogo from "@/images/home/part-time.webp";
import gcpDataMgmtImg from "@/images/projects/gcp-data-mgmt.webp";
import gcpHealthcareImg from "@/images/projects/gcp-healthcare.webp";

export type StackGroup = {
  label: string;
  items: string[];
};

export type WorkItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
  stack?: StackGroup[];
  metrics?: string[];
  logo?: StaticImageData;
  status: string;
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  description: string;
  thesis?: string;
  coursework?: string;
  logo?: StaticImageData;
  status: string;
};

export type FeaturedProject = {
  title: string;
  description: string;
  tech: string[];
  img: StaticImageData;
  github: string;
};

export type Cert = {
  name: string;
  issuer: string;
  year?: string;
  link?: string;
  icon: LucideIcon;
  logoUrl?: string;
};

export type TechPillar = {
  icon: LucideIcon;
  title: string;
  skills: string[];
};

export const education: EducationItem[] = [
  {
    degree: "Master of Data Science",
    school: "Universiti Malaya",
    period: "2024 - Present",
    description:
      "Focus: Deep Learning, Big Data Analytics, and Cloud Computing. CGPA: 3.90/4.00.",
    thesis: "Low Light Object Detection with YOLO",
    coursework:
      "Machine Learning for Data Science, Big Data Applications & Analytics, Data Mining, Programming for Data Science",
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

export const work: WorkItem[] = [
  {
    role: "Freelance AI Model Response Evaluator",
    company: "Outlier.ai / Alignerr",
    period: "2024 - Present",
    description:
      "Evaluating AI-generated responses across diverse LLM projects, contributing to model training for Malay language and technical/code prompts.",
    metrics: ["LLM evaluation", "Malay + code prompts"],
    logo: partTimeLogo,
    status: "Active (Part-time)",
  },
  {
    role: "Data Engineer",
    company: "Valuelabs · Kuala Lumpur, Malaysia",
    period: "Sep 2023 - Nov 2024",
    description:
      "Data engineering for a major telecom & media client — migrating legacy systems to a modern serverless AWS data platform.",
    metrics: ["−60% cloud cost", "Serverless migration", "Output parity validated"],
    highlights: [
      "Designed and implemented daily batch ETL pipelines in AWS (S3, Glue, Lambda, Step Functions, Redshift) loading relational data into a centralised Parquet lake and warehouse (PySpark/Python)",
      "Orchestrated end-to-end loads with metadata-driven patterns (upsert, incremental, truncate) and table-level reprocessing, with documented data lineage",
      "Isolated PII in raw landing zones and applied governance rules before data reached the shared lake",
      "Migrated legacy ingestion to a serverless AWS architecture, cutting monthly cloud cost 60% with validated output parity",
      "Automated QuickSight dashboards and dataset refreshes via API for business stakeholders",
      "Adopted and championed Valuelabs' agentic AI platform (AiDE) for pipeline documentation and code assistance, feeding usage feedback back to its product team",
      "Authored engineering documentation and ran knowledge-transfer sessions for handover across engineering and analytics teams",
    ],
    stack: [
      { label: "Frameworks", items: ["PySpark", "Pandas", "Python", "Bash"] },
      {
        label: "Cloud",
        items: [
          "AWS S3",
          "Lambda",
          "Step Functions",
          "Glue",
          "RDS",
          "Redshift",
          "DynamoDB",
          "QuickSight",
          "SNS",
        ],
      },
      { label: "Others", items: ["Pulumi (IaC)", "Git/Bitbucket", "Confluence"] },
    ],
    logo: valuelabsLogo,
    status: "Completed",
  },
  {
    role: "Data Engineer",
    company: "Astro · Kuala Lumpur, Malaysia",
    period: "Aug 2022 - Sep 2023",
    description:
      "Data engineering for Malaysia's leading content & entertainment company — maintaining legacy pipelines while the replacement platform was being built.",
    metrics: ["Legacy ETL maintained", "Root-cause analysis", "Redshift access control"],
    highlights: [
      "Maintained ETL pipelines for the data warehouse, processing daily event data (Python/SQL)",
      "Monitored data quality, integrity, and accuracy across reporting systems",
      "Investigated data integrity issues and performed root-cause analysis on pipeline failures",
      "Delivered periodic user activity reports and performed user access management on Redshift",
      "Drove storage optimization by cleaning orphaned uploads and managing S3 storage efficiency",
    ],
    stack: [
      { label: "Frameworks", items: ["Python", "Bash"] },
      { label: "Cloud", items: ["AWS S3", "Redshift"] },
      { label: "Others", items: ["SQL", "ETL", "Confluence"] },
    ],
    logo: astroLogo,
    status: "Completed",
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Google Cloud Data Management Project",
    description:
      "Led a team of 8 to build an end-to-end pipeline on GCP processing hotel reviews with PySpark and Hive on Dataproc — PySpark ran 40.3% faster on identical workloads, with 78% fewer missing values and Looker Studio dashboards for reporting.",
    tech: ["GCP", "Dataproc", "PySpark", "Hive", "Looker Studio"],
    img: gcpDataMgmtImg,
    github:
      "https://github.com/ridhwanrazaliwork/google-cloud-data-management-project",
  },
  {
    title: "End-to-End GCP Big Data Healthcare Pipeline",
    description:
      "Led a team of 5 to build a serverless GCP pipeline for chronic disease prediction, removing ingestion and latency bottlenecks — average query latency under 0.26s at a 97.45% success rate, surfaced in Looker Studio.",
    tech: ["GCP", "BigQuery", "Cloud Functions", "Dataprep", "Looker Studio"],
    img: gcpHealthcareImg,
    github:
      "https://github.com/ridhwanrazaliwork/google-cloud-big-data-project",
  },
];

export const proctoredCerts: Cert[] = [
  {
    name: "Microsoft Certified: Fabric Analytics Engineer Associate",
    issuer: "DP-600 · Microsoft",
    year: "2026",
    link: "https://learn.microsoft.com/en-us/users/ridhwanrazali-6198/credentials/cb9eb705fd8bdd03?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    icon: Database,
    logoUrl:
      "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg?branch=main",
  },
  {
    name: "Microsoft Certified: Fabric Data Engineer Associate",
    issuer: "DP-700 · Microsoft",
    year: "2026",
    link: "https://learn.microsoft.com/en-us/users/ridhwanrazali-6198/credentials/252d4000257134b7?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    icon: Cloud,
    logoUrl:
      "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg?branch=main",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2026",
    link: "https://www.credly.com/badges/b7d52e09-b9f4-414c-9656-c2ade892092e/public_url",
    icon: BadgeCheck,
    logoUrl:
      "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
  },
];

export const courseCompletions: Cert[] = [
  {
    name: "IBM Data Engineering Specialization",
    issuer: "Coursera · IBM",
    year: "2026",
    icon: Database,
    link: "https://www.coursera.org/account/accomplishments/specialization/GFZEE2AAXSQY",
  },
  {
    name: "IBM RAG & Agentic AI Specialization",
    issuer: "Coursera · IBM",
    year: "2026",
    icon: Brain,
    link: "https://www.coursera.org/account/accomplishments/specialization/F866LY2VMMFQ",
  },
  {
    name: "Google AI Professional Certificate",
    issuer: "Coursera · Google",
    year: "2026",
    icon: Brain,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/ZB3GJVWYRUE1",
  },
  {
    name: "MLOps Bootcamp",
    issuer: "MLflow, Airflow, Docker, GitHub Actions CI/CD",
    year: "2026",
    icon: Code2,
    link: "https://www.udemy.com/certificate/UC-194396ca-2e55-49aa-8dbd-f89940196223/",
  },
  {
    name: "Google Cloud Data Analytics Certificate",
    issuer: "BigQuery, SQL on GCP, Looker Studio",
    year: "2025",
    icon: Cloud,
    link: "https://www.credly.com/badges/85768225-9c63-48ee-91f7-3b056c6116cc/public_url",
  },
  {
    name: "Data Engineering using AWS Data Analytics",
    issuer: "Udemy — S3, Glue, Redshift, Athena",
    year: "2023",
    icon: Database,
    link: "https://www.udemy.com/certificate/UC-313c5b74-d2a7-48fa-9623-cb8bcc40299f/",
  },
  {
    name: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    year: "2025",
    icon: Monitor,
    link: "https://www.udemy.com/certificate/UC-df53cf97-6bfb-4112-80a9-08f91ed344ff/",
  },
  {
    name: "PyTorch for Deep Learning Bootcamp",
    issuer: "Zero to Mastery",
    year: "2025",
    icon: Cpu,
    link: "https://www.udemy.com/certificate/UC-8f34eab4-ca85-4563-9143-3d418709075b/",
  },
  {
    name: "TensorFlow for Deep Learning Bootcamp",
    issuer: "Zero to Mastery",
    year: "2025",
    icon: Layers,
    link: "https://www.udemy.com/certificate/UC-1679c1f9-0e48-4a7a-bc2f-34302e60ab2b/",
  },
  {
    name: "Mastering React & Node.js Firebase Authentication",
    issuer: "Udemy",
    year: "2025",
    icon: Shield,
    link: "https://www.udemy.com/certificate/UC-c006a6db-1f94-4a53-9a90-082b35a9615d/",
  },
];

export const techPillars: TechPillar[] = [
  {
    icon: Cloud,
    title: "Cloud & Data Engineering",
    skills: [
      "AWS",
      "GCP",
      "Azure",
      "Spark",
      "Hadoop",
      "Hive",
      "Dataproc",
      "Glue",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "MLflow",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Python",
      "R",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack & APIs",
    skills: [
      "Next.js",
      "FastAPI",
      "Node.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "Streamlit",
    ],
  },
  {
    icon: Database,
    title: "Databases & DevOps",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "DynamoDB",
      "MSSQL",
      "MySQL",
      "Supabase",
      "GitHub Actions",
      "Git",
      "Jira",
      "Bitbucket",
    ],
  },
];
