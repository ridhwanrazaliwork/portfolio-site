import type { Workplace } from "@/lib/workplaces";

/**
 * Hand-maintained map pins.
 *
 * Add one entry per office/branch. Coordinates are decimal degrees; open
 * /map with `npm run dev` (or /map?picker=1 in production) and click the map
 * to copy a ready-to-paste "lat, lng" pair.
 */
export const workplaces: Workplace[] = [
  {
    id: "astro-aabc",
    company: "Astro",
    branch: "All Asia Broadcast Centre, Bukit Jalil",
    role: "Data Engineer",
    area: "Kuala Lumpur",
    lat: 3.0513,
    lng: 101.7004,
  },
  {
    id: "valuelabs-tpm",
    company: "Valuelabs",
    branch: "Enterprise 3A, Technology Park Malaysia",
    role: "Data Engineer",
    area: "Kuala Lumpur",
    lat: 3.046822208501127,
    lng: 101.68736071396302,
  },
  {
    id: "foodpanda-cheras",
    company: "foodpanda",
    branch: "Jalan Wangsa 2/1, Taman Wangsa Cheras, 43200 Cheras",
    role: "Senior Analytics Engineer",
    area: "Cheras",
    lat: 3.08448,
    lng: 101.76994,
  },
  {
    id: "lavu-tech-cyberjaya",
    company: "LAVU TECH SOLUTIONS",
    branch: "Jalan GC 7, Cyber 4, 62988 Cyberjaya",
    role: "Senior Data Engineer",
    area: "Cyberjaya",
    lat: 2.92439,
    lng: 101.65648,
  },
  {
    id: "tentacle-bukit-pantai",
    company: "Tentacle Technologies",
    branch: "Taman Bukit Pantai, 59100 Kuala Lumpur",
    role: "Senior Data Engineer",
    area: "Kuala Lumpur",
    lat: 3.11508,
    lng: 101.66934,
  },
  {
    id: "snsoft-bangsar-south",
    company: "SNSoft",
    branch: "Avenue 3, Bangsar South City, 59200 Kuala Lumpur",
    role: "Senior Risk Analytics Engineer",
    area: "Kuala Lumpur",
    lat: 3.11111,
    lng: 101.66817,
  },
  {
    id: "emerson-nilai",
    company: "Emerson Process Management",
    branch: "Taman Semarak 1, 71800 Nilai",
    role: "Senior MES Data Engineer",
    area: "Nilai",
    lat: 2.82018,
    lng: 101.80528,
  },
  {
    id: "techstreet-cyberjaya",
    company: "techstreet",
    branch: "Cyber 9, 62988 Cyberjaya",
    role: "Lead Data Engineer",
    area: "Cyberjaya",
    lat: 2.91079,
    lng: 101.63979,
  },
  {
    id: "lbs-bina-pj",
    company: "LBS Bina Group",
    branch: "Jalan SS 9A/1, SS 9A, 47300 Petaling Jaya",
    role: "Data Engineer",
    area: "Petaling Jaya",
    lat: 3.0852,
    lng: 101.62036,
  },
  {
    id: "scicom-klcc",
    company: "Scicom (MSC)",
    branch: "Persiaran PETRONAS, KLCC, 50450 Kuala Lumpur",
    role: "Azure Data Engineer",
    area: "Kuala Lumpur",
    lat: 3.15612,
    lng: 101.71054,
  },
];
