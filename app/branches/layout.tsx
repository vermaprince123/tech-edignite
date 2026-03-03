import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Branches",
  description:
    "Explore all 7 engineering branches at SVNIT Surat — CSE, ECE, EE, ME, Civil, Chemical, and IT — with branch-specific blogs, quizzes, and learning resources.",
  keywords: [
    "SVNIT Engineering Branches",
    "CSE ECE EE ME CE CHE IT",
    "Branch-wise Resources SVNIT",
    "Engineering Departments SVNIT Surat",
  ],
  openGraph: {
    title: "Engineering Branches | Tech Edignite — SVNIT",
    description:
      "Explore all 7 engineering branches at SVNIT Surat. Access branch-specific blogs, quizzes, and academic resources.",
    type: "website",
  },
};

export default function BranchesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
