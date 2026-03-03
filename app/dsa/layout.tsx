import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Sheet — Java Solutions",
  description:
    "Practice Data Structures & Algorithms with Java solutions. Covers Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Sorting, Strings, and Stack/Queue — with time complexity, approach, and full code.",
  keywords: [
    "DSA Java", "Data Structures Algorithms Java",
    "Two Sum Java", "Merge Sort Java", "Quick Sort Java",
    "Linked List Java", "Binary Tree Java", "Graph BFS DFS Java",
    "Dynamic Programming Java", "Knapsack Problem Java", "LCS Java",
    "SVNIT DSA", "Placement DSA", "GATE DSA",
    "LeetCode Java", "Coding Interview Java",
  ],
  openGraph: {
    title: "DSA Sheet — Java Solutions | Tech Edignite",
    description:
      "Handpicked DSA problems with complete Java solutions, approach breakdowns, and complexity analysis — perfect for placements and GATE.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSA Sheet — Java Solutions | Tech Edignite",
    description:
      "Practice DSA with Java. Arrays, Trees, Graphs, DP, Sorting — with full code & explanations.",
  },
};

export default function DSALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
