import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";
import { dsaProblems } from "@/lib/dsa-data";
import { quizzes } from "@/lib/quiz-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-edignite.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/blog`,             lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/branches`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/dsa`,              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/quiz`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/exam-papers`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,          lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
  ];

  // ── Blog posts ───────────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // ── DSA problems ─────────────────────────────────────────────────────────────
  const dsaPages: MetadataRoute.Sitemap = dsaProblems.map((p) => ({
    url: `${BASE}/dsa/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Quiz pages ───────────────────────────────────────────────────────────────
  const quizPages: MetadataRoute.Sitemap = quizzes.map((q) => ({
    url: `${BASE}/quiz/${q.branchId}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // ── Branch filtered blog pages ───────────────────────────────────────────────
  const branchPages: MetadataRoute.Sitemap = [
    "CSE", "ECE", "EE", "ME", "CE", "CHE", "IT",
  ].map((b) => ({
    url: `${BASE}/blog?branch=${b}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...dsaPages, ...quizPages, ...branchPages];
}
