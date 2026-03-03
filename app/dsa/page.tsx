"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  dsaProblems,
  dsaCategories,
  type DSACategory,
  type DSADifficulty,
} from "@/lib/dsa-data";
import Link from "next/link";
import { Code2, Filter, ChevronRight, Clock, BarChart2, Tag } from "lucide-react";

const difficultyConfig: Record<DSADifficulty, { color: string; bg: string; dot: string }> = {
  Easy:   { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-500" },
  Medium: { color: "text-amber-600 dark:text-amber-400",    bg: "bg-amber-500/10 border-amber-500/20",    dot: "bg-amber-500" },
  Hard:   { color: "text-red-600 dark:text-red-400",        bg: "bg-red-500/10 border-red-500/20",        dot: "bg-red-500" },
};

export default function DSAPage() {
  const [activeCategory, setActiveCategory] = useState<DSACategory | "All">("All");
  const [activeDifficulty, setActiveDifficulty] = useState<DSADifficulty | "All">("All");

  const filtered = useMemo(() => {
    return dsaProblems.filter((p) => {
      const catMatch = activeCategory === "All" || p.category === activeCategory;
      const difMatch = activeDifficulty === "All" || p.difficulty === activeDifficulty;
      return catMatch && difMatch;
    });
  }, [activeCategory, activeDifficulty]);

  const counts = useMemo(() => ({
    Easy:   dsaProblems.filter(p => p.difficulty === "Easy").length,
    Medium: dsaProblems.filter(p => p.difficulty === "Medium").length,
    Hard:   dsaProblems.filter(p => p.difficulty === "Hard").length,
  }), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-500/5 to-cyan-400/10 dark:from-blue-900/20 dark:to-cyan-900/20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-8"
              >
                <Code2 className="h-10 w-10 text-blue-500" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
                DSA Sheet
              </h1>
              <p className="text-lg text-muted-foreground mb-2 font-mono text-blue-500/80 dark:text-blue-400/80">
                // Written in Java 🟠
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-6" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Handpicked Data Structures & Algorithm problems — each with a full
                Java solution, approach breakdown, and complexity analysis.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {(["Easy", "Medium", "Hard"] as DSADifficulty[]).map((d) => (
                  <div
                    key={d}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${difficultyConfig[d].bg} ${difficultyConfig[d].color}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${difficultyConfig[d].dot}`} />
                    {counts[d]} {d}
                  </div>
                ))}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border bg-muted/60 text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  {dsaProblems.length} Problems
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* ── Category Filter ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground">
              <Filter className="h-4 w-4" /> Filter by Category
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  activeCategory === "All"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/40 hover:bg-muted/60"
                }`}
              >
                All Topics
              </button>
              {dsaCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted/60"
                  }`}
                >
                  <span>{cat.icon}</span> {cat.id}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Difficulty Filter ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDifficulty(d)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                    activeDifficulty === d
                      ? d === "All"
                        ? "bg-primary text-primary-foreground border-primary"
                        : `border ${difficultyConfig[d as DSADifficulty]?.bg ?? ""} ${difficultyConfig[d as DSADifficulty]?.color ?? ""} border-opacity-100`
                      : "border-border text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  {d === "All" ? "All Levels" : d}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Problem Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeDifficulty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((problem, idx) => {
                const cat = dsaCategories.find(c => c.id === problem.category);
                const diff = difficultyConfig[problem.difficulty];
                return (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <Link href={`/dsa/${problem.id}`} className="block h-full">
                      <div className="relative h-full rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                        {/* Top gradient stripe */}
                        <div className={`h-1.5 w-full bg-gradient-to-r ${cat?.color ?? "from-gray-400 to-gray-600"}`} />

                        <div className="p-5 flex flex-col flex-1">
                          {/* Header row */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{cat?.icon}</span>
                              <span className="text-xs font-semibold text-muted-foreground">{problem.category}</span>
                            </div>
                            <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${diff.bg} ${diff.color}`}>
                              {problem.difficulty}
                            </span>
                          </div>

                          {/* Problem number + title */}
                          <div className="mb-3">
                            <span className="text-xs font-mono text-muted-foreground">#{problem.id}</span>
                            <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mt-0.5">
                              {problem.title}
                            </h2>
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                            {problem.description}
                          </p>

                          {/* Complexity badges */}
                          <div className="flex gap-3 mt-4 text-xs text-muted-foreground font-mono">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {problem.timeComplexity}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart2 className="h-3 w-3" /> {problem.spaceComplexity}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {problem.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                <Tag className="h-2.5 w-2.5" />{tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                            <span className="text-xs font-semibold text-primary">View Solution</span>
                            <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Code2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No problems found for this filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
