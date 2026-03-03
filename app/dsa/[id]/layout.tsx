import type { Metadata } from "next";
import { dsaProblems } from "@/lib/dsa-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-edignite.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const problem = dsaProblems.find((p) => p.id === parseInt(id));

  if (!problem) {
    return {
      title: "Problem Not Found",
      description: "The requested DSA problem could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = `${BASE}/dsa/${problem.id}`;
  const fullTitle = `${problem.title} — Java Solution`;

  return {
    title: fullTitle,
    description: `${problem.description} Time complexity: ${problem.timeComplexity}. Space complexity: ${problem.spaceComplexity}. Includes Java source code, approach explanation, and sample I/O.`,
    keywords: [
      ...problem.tags,
      `${problem.title} Java`,
      `${problem.category} Java`,
      `${problem.title} solution`,
      `${problem.difficulty} DSA problem`,
      "Java coding interview",
      "DSA SVNIT",
      "Tech Edignite DSA",
    ],

    openGraph: {
      title: fullTitle,
      description: `Complete Java solution for ${problem.title}. Category: ${problem.category}. Difficulty: ${problem.difficulty}. ${problem.timeComplexity} time, ${problem.spaceComplexity} space.`,
      url: pageUrl,
      type: "article",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: fullTitle }],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: `Java solution for ${problem.title}. ${problem.difficulty} | ${problem.category} | ${problem.timeComplexity}`,
      images: ["/logo.png"],
    },

    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function DSAProblemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
