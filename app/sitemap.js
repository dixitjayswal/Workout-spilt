import { PROGRAM } from "@/lib/program";
import { SITE_URL, exerciseSlugs } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/exercise`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...PROGRAM.map(d => ({
      url: `${SITE_URL}/day/${d.id}`,
      lastModified: now, changeFrequency: "monthly", priority: 0.8
    })),
    ...exerciseSlugs().map(s => ({
      url: `${SITE_URL}/exercise/${s}`,
      lastModified: now, changeFrequency: "monthly", priority: 0.7
    })),
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.1 }
  ];
}
