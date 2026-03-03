"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { books, onlineCourses, type Branch, type BookCategory, type BookLevel } from "@/lib/books-data";
import { ExternalLink, Star, BookOpen, Monitor, Filter, ShoppingCart, Search, BadgeCheck } from "lucide-react";

type TabId = "books" | "courses";

const BRANCHES: Branch[] = ["CSE", "ECE", "EE", "ME", "CE", "CHE", "IT"];

const branchConfig: Record<Branch, { color: string; gradient: string; icon: string }> = {
  CSE: { color: "text-blue-600 dark:text-blue-400",   gradient: "from-blue-500 to-cyan-500",     icon: "💻" },
  ECE: { color: "text-purple-600 dark:text-purple-400", gradient: "from-purple-500 to-pink-500", icon: "📡" },
  EE:  { color: "text-yellow-600 dark:text-yellow-400", gradient: "from-yellow-500 to-orange-500", icon: "⚡" },
  ME:  { color: "text-green-600 dark:text-green-400",  gradient: "from-green-500 to-emerald-500", icon: "⚙️" },
  CE:  { color: "text-amber-600 dark:text-amber-400",  gradient: "from-amber-500 to-red-500",     icon: "🏗️" },
  CHE: { color: "text-teal-600 dark:text-teal-400",   gradient: "from-teal-500 to-green-500",    icon: "🧪" },
  IT:  { color: "text-indigo-600 dark:text-indigo-400", gradient: "from-indigo-500 to-purple-500", icon: "🌐" },
};

const levelColors: Record<BookLevel, string> = {
  Beginner:     "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced:     "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const categoryColors: Record<BookCategory, string> = {
  Textbook:        "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Reference:       "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Problem Solving": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Self-Learning": "bg-green-500/10 text-green-600 dark:text-green-400",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : i - 0.5 <= rating
              ? "text-amber-400 fill-amber-200"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function BooksPage() {
  const [activeTab, setActiveTab] = useState<TabId>("books");
  const [selectedBranch, setSelectedBranch] = useState<Branch | "All">("All");
  const [selectedLevel, setSelectedLevel] = useState<BookLevel | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const branchMatch = selectedBranch === "All" || b.branch === selectedBranch;
      const levelMatch  = selectedLevel === "All"  || b.level === selectedLevel;
      const searchMatch =
        searchQuery === "" ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return branchMatch && levelMatch && searchMatch;
    });
  }, [selectedBranch, selectedLevel, searchQuery]);

  const filteredCourses = useMemo(() => {
    return onlineCourses.filter((c) => {
      const branchMatch = selectedBranch === "All" || c.branch === selectedBranch;
      const searchMatch =
        searchQuery === "" ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return branchMatch && searchMatch;
    });
  }, [selectedBranch, searchQuery]);

  const mustReads = books.filter(b =>
    (selectedBranch === "All" || b.branch === selectedBranch) && b.mustRead
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-orange-500/5 to-rose-400/10 dark:from-amber-900/20 dark:to-rose-900/10" />
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
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-8"
              >
                <BookOpen className="h-10 w-10 text-amber-500" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent leading-tight">
                Books & Courses
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full mb-6" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Curated textbooks, reference guides, and online courses for all 7
                engineering branches. Click any book to find it on Amazon.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  {books.length} Textbooks
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border text-muted-foreground">
                  <Monitor className="h-4 w-4 text-blue-500" />
                  {onlineCourses.length} Online Courses
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-green-500" />
                  {books.filter(b => b.mustRead).length} Must-Reads
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border text-muted-foreground">
                  <ShoppingCart className="h-4 w-4 text-orange-500" />
                  Amazon India Links
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">

          {/* ── Filters bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books, authors, subjects…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Branch filter */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Filter className="h-3.5 w-3.5" /> Branch
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBranch("All")}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${selectedBranch === "All" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60"}`}
                >
                  All Branches
                </button>
                {BRANCHES.map((b) => {
                  const cfg = branchConfig[b];
                  return (
                    <button
                      key={b}
                      onClick={() => setSelectedBranch(b)}
                      className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5 ${selectedBranch === b ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60"}`}
                    >
                      {cfg.icon} {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level filter (books only) */}
            {activeTab === "books" && (
              <div className="flex flex-wrap gap-2">
                {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                      selectedLevel === l
                        ? "bg-primary text-primary-foreground border-primary"
                        : l === "All"
                        ? "border-border hover:bg-muted/60 text-muted-foreground"
                        : `border-border ${levelColors[l as BookLevel]} hover:opacity-80`
                    }`}
                  >
                    {l === "All" ? "All Levels" : l}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Tab bar ── */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("books")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeTab === "books" ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-border hover:bg-muted/60 text-muted-foreground"}`}
            >
              <BookOpen className="h-4 w-4" />
              Textbooks & References
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">{filteredBooks.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeTab === "courses" ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-border hover:bg-muted/60 text-muted-foreground"}`}
            >
              <Monitor className="h-4 w-4" />
              Online Courses
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">{filteredCourses.length}</span>
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* ════ BOOKS TAB ═════════════════════════════════════════════════ */}
            {activeTab === "books" && (
              <motion.div
                key="books"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {/* Must-read banner */}
                {mustReads.length > 0 && searchQuery === "" && (
                  <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                    <h3 className="font-bold text-sm text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4" />
                      ⭐ Must-Read Picks
                      {selectedBranch !== "All" && ` for ${selectedBranch}`}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mustReads.map((b) => (
                        <a
                          key={b.id}
                          href={b.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-amber-500/20 hover:border-amber-500/50 hover:shadow-sm transition-all text-sm font-medium"
                        >
                          <span>{b.coverEmoji}</span>
                          <span className="truncate max-w-[180px]">{b.title}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Books grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredBooks.map((book, idx) => {
                    const cfg = branchConfig[book.branch];
                    return (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <a
                          href={book.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          <div className="relative h-full rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                            {/* Gradient stripe */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.gradient}`} />

                            {/* Must-read badge */}
                            {book.mustRead && (
                              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-md">
                                <Star className="h-2.5 w-2.5 fill-white" /> Must Read
                              </div>
                            )}

                            <div className="p-5 flex flex-col flex-1">
                              {/* Cover + branch */}
                              <div className="flex items-start gap-3 mb-4">
                                <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-3xl shadow-md shrink-0`}
                                  style={{ minHeight: "4.5rem" }}>
                                  {book.coverEmoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${cfg.gradient} text-white`}>
                                      {cfg.icon} {book.branch}
                                    </span>
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${levelColors[book.level]}`}>
                                      {book.level}
                                    </span>
                                  </div>
                                  <h3 className="font-bold text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                                    {book.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                                </div>
                              </div>

                              {/* Subject + category */}
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                                  {book.subject}
                                </span>
                                <span className={`text-[11px] px-2 py-0.5 rounded-full ${categoryColors[book.category]}`}>
                                  {book.category}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
                                {book.description}
                              </p>

                              {/* Rating + tags */}
                              <div className="flex items-center justify-between mb-4">
                                <StarRating rating={book.rating} />
                                <div className="flex gap-1 flex-wrap justify-end">
                                  {book.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                                  ))}
                                </div>
                              </div>

                              {/* Amazon CTA */}
                              <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                                <ShoppingCart className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300 flex-1">
                                  Find on Amazon India
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                              </div>
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredBooks.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No books found for this filter.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ════ COURSES TAB ═══════════════════════════════════════════════ */}
            {activeTab === "courses" && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {filteredCourses.map((course, idx) => {
                  const cfg = branchConfig[course.branch];
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group"
                    >
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="relative h-full rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                          <div className={`h-1.5 bg-gradient-to-r ${cfg.gradient}`} />

                          {/* Free badge */}
                          {course.free && (
                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold">
                              FREE
                            </div>
                          )}

                          <div className="p-5 flex flex-col flex-1">
                            {/* Platform icon + branch */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-2xl">{course.platformIcon}</span>
                              <div>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${cfg.gradient} text-white`}>
                                  {cfg.icon} {course.branch}
                                </span>
                              </div>
                              <span className={`ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full border ${levelColors[course.level]}`}>
                                {course.level}
                              </span>
                            </div>

                            <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors mb-1">
                              {course.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-1">
                              🏫 {course.platform}
                            </p>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border inline-block mb-3 self-start">
                              {course.subject}
                            </span>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                              {course.description}
                            </p>

                            {/* CTA */}
                            <div className={`mt-4 flex items-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r ${cfg.gradient} text-white`}>
                              <Monitor className="h-4 w-4 shrink-0" />
                              <span className="text-sm font-semibold flex-1">
                                {course.free ? "Start for Free" : "Enroll Now"}
                              </span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}

                {filteredCourses.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground col-span-2">
                    <Monitor className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No courses found for this filter.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
