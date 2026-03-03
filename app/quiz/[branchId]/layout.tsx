import type { Metadata } from "next";
import { quizzes } from "@/lib/quiz-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-edignite.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branchId: string }>;
}): Promise<Metadata> {
  const { branchId } = await params;
  const quiz = quizzes.find((q) => q.branchId === branchId);

  if (!quiz) {
    return {
      title: "Quiz Not Found",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = `${BASE}/quiz/${quiz.branchId}`;
  const title = `${quiz.branch} Quiz — ${quiz.totalQuestions} Questions`;

  return {
    title,
    description: `Test your ${quiz.branch} knowledge with ${quiz.totalQuestions} mixed MCQ and True/False questions. Covers easy, medium, and hard difficulty. Instant results with explanations. Perfect for SVNIT students.`,
    keywords: [
      `${quiz.branchId} Quiz`,
      `${quiz.branch} MCQ`,
      `${quiz.branchId} SVNIT Quiz`,
      `${quiz.branch} Questions`,
      "Engineering MCQ SVNIT",
      "GATE MCQ Practice",
      "Placement Quiz",
    ],

    openGraph: {
      title,
      description: quiz.description,
      url: pageUrl,
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: title }],
    },

    twitter: {
      card: "summary",
      title,
      description: quiz.description,
    },

    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function QuizBranchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
