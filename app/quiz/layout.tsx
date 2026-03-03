import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Quizzes",
  description:
    "Test your engineering knowledge with branch-wise quizzes for SVNIT students. Covers CSE, ECE, EE, ME, Civil, Chemical, and IT with MCQs and True/False questions at easy, medium, and hard difficulty.",
  keywords: [
    "Engineering Quiz SVNIT",
    "CSE Quiz MCQ", "ECE Quiz MCQ", "EE Quiz MCQ",
    "ME Quiz MCQ", "Civil Engineering Quiz", "Chemical Engineering Quiz",
    "IT Quiz MCQ",
    "SVNIT Placement Quiz", "GATE Practice Questions",
    "Engineering MCQ Questions",
  ],
  openGraph: {
    title: "Engineering Quizzes | Tech Edignite — SVNIT",
    description:
      "Branch-wise engineering quizzes with MCQ and True/False questions. Instant results with explanations. Covers all 7 SVNIT branches.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Engineering Quizzes | Tech Edignite",
    description: "Branch-wise engineering quizzes for SVNIT students with instant results.",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
