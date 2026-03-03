"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { roadmaps } from "@/lib/roadmap-data";
import Link from "next/link";
import { ChevronRight, Map, BookOpen, Briefcase, Zap } from "lucide-react";

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-violet-500/5 to-cyan-400/10 dark:from-fuchsia-900/20 dark:to-cyan-900/10" />
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
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 mb-8"
              >
                <Map className="h-10 w-10 text-fuchsia-500" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
                Branch Roadmaps
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 mx-auto rounded-full mb-6" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Visual, step-by-step guidance for every SVNIT engineering branch.
                Find your career path, master the right skills, and build a
                successful 4-year journey.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-muted-foreground">
                {[
                  { icon: <Map className="h-4 w-4 text-fuchsia-500" />, label: "Flowchart Roadmap" },
                  { icon: <Briefcase className="h-4 w-4 text-blue-500" />, label: "Career Paths" },
                  { icon: <BookOpen className="h-4 w-4 text-green-500" />, label: "Semester-wise Guide" },
                  { icon: <Zap className="h-4 w-4 text-amber-500" />, label: "Skill Map" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border">
                    {f.icon} {f.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Branch Cards ── */}
        <section className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((r, i) => (
              <motion.div
                key={r.branchId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link href={`/roadmaps/${r.branchId}`} className="block h-full">
                  <div className="relative h-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30 flex flex-col">
                    {/* Gradient header */}
                    <div className={`bg-gradient-to-br ${r.gradient} p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/15" />
                      <div className="relative z-10">
                        <div className="text-5xl mb-3">{r.icon}</div>
                        <h2 className="text-xl font-bold text-white">{r.branch}</h2>
                        <p className="text-white/75 text-sm mt-1">{r.tagline}</p>
                      </div>
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                      <div className="absolute -bottom-4 right-8 w-16 h-16 rounded-full bg-white/10" />
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: "Phases", value: r.studyPhases.length },
                          { label: "Careers", value: r.careerPaths.length },
                          { label: "Skills", value: r.skillMap.reduce((a, s) => a + s.items.length, 0) },
                        ].map((s) => (
                          <div key={s.label} className="rounded-xl bg-muted/60 p-2.5 text-center">
                            <div className="text-lg font-bold">{s.value}</div>
                            <div className="text-[11px] text-muted-foreground">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                        {r.overview}
                      </p>

                      {/* Career path pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.careerPaths.slice(0, 3).map((cp) => (
                          <span key={cp.id} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                            {cp.icon} {cp.title}
                          </span>
                        ))}
                        {r.careerPaths.length > 3 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            +{r.careerPaths.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                        <span className="text-xs font-semibold text-primary">View Roadmap</span>
                        <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
