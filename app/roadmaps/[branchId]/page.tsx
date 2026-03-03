"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { roadmaps } from "@/lib/roadmap-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Briefcase, Zap, Wrench, Library,
  ChevronDown, CheckCircle2, AlertCircle, Star, ArrowRight,
} from "lucide-react";

type TabId = "flowchart" | "careers" | "skills" | "resources";

const TABS: { id: TabId; label: string; icon: typeof BookOpen }[] = [
  { id: "flowchart", label: "Learning Path", icon: BookOpen },
  { id: "careers",   label: "Career Paths",  icon: Briefcase },
  { id: "skills",    label: "Skill Map",     icon: Zap },
  { id: "resources", label: "Resources",     icon: Library },
];

const PRIORITY_CONFIG = {
  "Must Learn":    { color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",     dot: "bg-red-500" },
  "Good to Have":  { color: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  "Advanced":      { color: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400", dot: "bg-purple-500" },
};

// ── Flowchart connector arrow ─────────────────────────────────────────────────
function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-0.5 h-6 bg-gradient-to-b from-border to-primary/40" />
      <div className="w-3 h-3 border-r-2 border-b-2 border-primary/50 rotate-45 -mt-1.5" />
      {label && (
        <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// ── Start / End oval nodes ────────────────────────────────────────────────────
function OvalNode({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className={`mx-auto inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-lg`}>
      {label}
    </div>
  );
}

// ── Decision diamond ──────────────────────────────────────────────────────────
function DiamondNode({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-2">
      <div className="relative flex items-center justify-center w-52 h-20">
        {/* Diamond shape via rotated square */}
        <div className="absolute w-36 h-36 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border-2 border-violet-400/50 rotate-45 rounded-lg" />
        <span className="relative z-10 text-center text-sm font-bold text-violet-700 dark:text-violet-300 leading-tight px-2">
          {label}
        </span>
      </div>
    </div>
  );
}

// ── Phase card in flowchart ───────────────────────────────────────────────────
function PhaseCard({ phase, index, gradient }: { phase: any; index: number; gradient: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Phase label bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
        <button
          className="w-full p-5 flex items-start gap-4 text-left"
          onClick={() => setOpen(!open)}
        >
          {/* Year badge */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white shadow-md`}>
            <span className="text-xs font-semibold opacity-80">Year</span>
            <span className="text-2xl font-black leading-none">{phase.year}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base">{phase.label}</h3>
              <span className="text-xs text-muted-foreground shrink-0">{phase.semesters}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{phase.outcome}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform mt-1 ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                {/* Subjects */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> Key Subjects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.subjects.map((s: string) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted/70 text-foreground border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Skills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> Skills to Build
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skills.map((s: string) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Pro tip */}
                <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                  <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Pro Tip:</strong> {phase.tip}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Career path card ─────────────────────────────────────────────────────────
function CareerCard({ career }: { career: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className={`${career.color} p-5 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="text-4xl mb-2">{career.icon}</div>
          <h3 className="text-lg font-bold text-white">{career.title}</h3>
          <p className="text-white/75 text-xs mt-1">{career.description}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Steps */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">How to Get There</h4>
          <div className="space-y-2">
            {career.steps.map((step: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                </div>
                <span className="text-xs text-muted-foreground">{step}</span>
                {i < career.steps.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground/40 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Salary */}
        <div className="flex items-center justify-between rounded-xl bg-green-500/10 border border-green-500/20 p-3">
          <span className="text-xs text-muted-foreground">Avg. Package</span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">{career.avgSalary}</span>
        </div>
        {/* Companies */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Top Hirers</h4>
          <div className="flex flex-wrap gap-1.5">
            {career.topCompanies.map((c: string) => (
              <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RoadmapDetailPage() {
  const params = useParams();
  const branchId = params.branchId as string;
  const roadmap = roadmaps.find((r) => r.branchId === branchId);
  const [activeTab, setActiveTab] = useState<TabId>("flowchart");

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Roadmap Not Found</h1>
            <Link href="/roadmaps" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90">
              <ArrowLeft className="h-4 w-4" /> All Roadmaps
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/roadmaps" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Roadmaps
            </Link>
          </motion.div>

          {/* ── Hero banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden border border-border shadow-xl mb-8"
          >
            <div className={`bg-gradient-to-br ${roadmap.gradient} p-8 md:p-12 relative overflow-hidden text-white`}>
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl border border-white/30">
                  {roadmap.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/60 text-sm font-mono">{roadmap.branchId}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="text-white/60 text-sm">SVNIT Surat</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{roadmap.branch}</h1>
                  <p className="text-white/75 text-base max-w-xl">{roadmap.tagline}</p>
                </div>
                {/* Quick stats */}
                <div className="flex gap-4 text-center">
                  {[
                    { label: "Years", value: "4" },
                    { label: "Careers", value: roadmap.careerPaths.length },
                    { label: "Skills", value: `${roadmap.skillMap.reduce((a, s) => a + s.items.length, 0)}+` },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <div className="text-2xl font-black">{s.value}</div>
                      <div className="text-xs text-white/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 right-24 w-28 h-28 rounded-full bg-white/10" />
            </div>
            <div className="bg-card px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground">{roadmap.overview}</p>
            </div>
          </motion.div>

          {/* ── Tab bar ── */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "border-border hover:bg-muted/70 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Tab content ── */}
          <AnimatePresence mode="wait">

            {/* ════ FLOWCHART TAB ════════════════════════════════════════════ */}
            {activeTab === "flowchart" && (
              <motion.div
                key="flowchart"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">📊 4-Year Learning Flowchart</h2>
                  <p className="text-muted-foreground text-sm">Click any phase card to expand subjects, skills, and pro tips</p>
                </div>

                <div className="flex flex-col items-center">
                  {/* START node */}
                  <OvalNode label="🎓 Join SVNIT — Day 1" gradient={roadmap.gradient} />
                  <FlowArrow />

                  {roadmap.studyPhases.map((phase, i) => (
                    <div key={phase.year} className="w-full flex flex-col items-center">
                      <PhaseCard phase={phase} index={i} gradient={roadmap.gradient} />
                      {i < roadmap.studyPhases.length - 1 && (
                        <FlowArrow label="Semester complete →" />
                      )}
                    </div>
                  ))}

                  <FlowArrow label="Graduation" />

                  {/* DECISION node */}
                  <DiamondNode label={`What's your goal after ${roadmap.branchId}?`} />

                  {/* Career path outcomes */}
                  <div className="w-full mt-6">
                    {/* Branching lines */}
                    <div className="relative flex justify-center mb-6">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                      <div className="absolute top-6 left-[15%] right-[15%] h-0.5 bg-border" />
                      {roadmap.careerPaths.map((_, i) => {
                        const total = roadmap.careerPaths.length;
                        const pct = total === 1 ? 50 : (i / (total - 1)) * 70 + 15;
                        return (
                          <div
                            key={i}
                            className="absolute top-6 w-0.5 h-6 bg-border"
                            style={{ left: `${pct}%` }}
                          />
                        );
                      })}
                      <div className="mt-12" />
                    </div>

                    {/* Career path labels below the branch */}
                    <div className={`grid grid-cols-${Math.min(roadmap.careerPaths.length, 2)} md:grid-cols-${Math.min(roadmap.careerPaths.length, 4)} gap-3`}>
                      {roadmap.careerPaths.map((cp) => (
                        <motion.div
                          key={cp.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`${cp.color} rounded-2xl p-4 text-white text-center relative overflow-hidden shadow-md`}
                        >
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="relative z-10">
                            <div className="text-3xl mb-2">{cp.icon}</div>
                            <div className="text-sm font-bold leading-tight">{cp.title}</div>
                            <div className="text-xs text-white/70 mt-1">{cp.avgSalary}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <FlowArrow />
                  <OvalNode label="🚀 Successful Career" gradient={roadmap.gradient} />
                </div>
              </motion.div>
            )}

            {/* ════ CAREERS TAB ═══════════════════════════════════════════════ */}
            {activeTab === "careers" && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">💼 Career Path Breakdown</h2>
                  <p className="text-muted-foreground text-sm">Step-by-step roadmap for each career path after {roadmap.branchId}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roadmap.careerPaths.map((cp) => (
                    <CareerCard key={cp.id} career={cp} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ════ SKILLS TAB ════════════════════════════════════════════════ */}
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">⚡ Skill Map</h2>
                  <p className="text-muted-foreground text-sm">Skills organized by priority — what to learn and in what order</p>
                </div>

                {/* Priority legend */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {(["Must Learn", "Good to Have", "Advanced"] as const).map((p) => (
                    <div key={p} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-semibold ${PRIORITY_CONFIG[p].color}`}>
                      <span className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[p].dot}`} />
                      {p}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {roadmap.skillMap.map((skill, i) => {
                    const cfg = PRIORITY_CONFIG[skill.priority];
                    return (
                      <motion.div
                        key={skill.category}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="rounded-2xl border border-border bg-card p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{skill.icon}</span>
                            <h3 className="font-semibold text-sm">{skill.category}</h3>
                          </div>
                          <span className={`text-[11px] px-2.5 py-1 rounded-full border font-bold ${cfg.color}`}>
                            {skill.priority}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground border border-border flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-2.5 w-2.5 text-primary" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tools section */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" /> Tools to Learn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.toolsToLearn.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                        🔧 {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════ RESOURCES TAB ════════════════════════════════════════════ */}
            {activeTab === "resources" && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">📚 Top Learning Resources</h2>
                  <p className="text-muted-foreground text-sm">Curated books, courses, and platforms for {roadmap.branchId} students</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {roadmap.topResources.map((res, i) => (
                    <motion.div
                      key={res.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl shrink-0">
                        {res.type === "Book" ? "📖"
                          : res.type === "Course" ? "🎓"
                          : res.type === "Practice Platform" ? "⌨️"
                          : res.type === "Certification" ? "🏅"
                          : "📜"}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{res.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border mt-1 inline-block">
                          {res.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Explore more */}
                <div className={`rounded-2xl bg-gradient-to-br ${roadmap.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Keep Learning 🚀</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Explore our DSA sheet, quizzes, and branch-specific blogs to supplement your learning journey.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/dsa" className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm font-semibold transition-colors">
                        💻 DSA Sheet
                      </Link>
                      <Link href={`/quiz/${roadmap.branchId}`} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm font-semibold transition-colors">
                        🧠 Take {roadmap.branchId} Quiz
                      </Link>
                      <Link href={`/blog?branch=${roadmap.branchId}`} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm font-semibold transition-colors">
                        📝 {roadmap.branchId} Blogs
                      </Link>
                    </div>
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
