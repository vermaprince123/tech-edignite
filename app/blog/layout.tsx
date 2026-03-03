import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blogs",
  description:
    "Read in-depth engineering blogs covering CSE, ECE, EE, ME, CE, CHE, and IT topics curated for SVNIT students. Expert-written tutorials, concept guides, and more.",
  keywords: [
    "SVNIT Engineering Blogs",
    "CSE Blogs", "ECE Blogs", "EE Blogs", "ME Blogs", "CE Blogs",
    "CHE Blogs", "IT Blogs",
    "Engineering Tutorials SVNIT",
    "B.Tech Study Material",
  ],
  openGraph: {
    title: "Engineering Blogs | Tech Edignite",
    description:
      "Explore branch-wise engineering blogs for SVNIT students — DSA, 5G, Renewable Energy, Robotics, Sustainable Construction, Polymers, Cloud Computing and more.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Engineering Blogs | Tech Edignite",
    description: "Branch-wise engineering blogs for SVNIT students.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
