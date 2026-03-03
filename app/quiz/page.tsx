"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { quizzes } from "@/lib/quiz-data";
import Link from "next/link";
import { Clock, HelpCircle, BrainCircuit, ChevronRight, Trophy } from "lucide-react";

const difficultyColors = {
  easy: "text-emerald-500",
  medium: "text-amber-500",
  hard: "text-red-500",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-blue-500/5 to-cyan-400/10 dark:from-violet-900/20 dark:via-blue-900/10 dark:to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
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
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-8"
              >
                <BrainCircuit className="h-10 w-10 text-primary" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 dark:from-violet-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
                Branch Quizzes
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full mb-6" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Test your engineering knowledge with our curated quizzes. Each
                quiz mixes MCQs and true/false questions across varying
                difficulty levels.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span>10 Questions per Quiz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>15 Minutes Time Limit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>Instant Results & Explanations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quiz Cards */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => {
              const easyCount = quiz.questions.filter(q => q.difficulty === "easy").length;
              const mediumCount = quiz.questions.filter(q => q.difficulty === "medium").length;
              const hardCount = quiz.questions.filter(q => q.difficulty === "hard").length;
              const mcqCount = quiz.questions.filter(q => q.type === "mcq").length;
              const tfCount = quiz.questions.filter(q => q.type === "true-false").length;

              return (
                <motion.div
                  key={quiz.branchId}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <Link href={`/quiz/${quiz.branchId}`} className="block h-full">
                    <div className="relative h-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-br ${quiz.color} p-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                        <div className="relative z-10">
                          <div className="text-5xl mb-3">{quiz.icon}</div>
                          <h2 className="text-xl font-bold text-white leading-tight">
                            {quiz.branch}
                          </h2>
                          <span className="inline-block mt-2 px-3 py-1 text-xs font-bold bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30">
                            {quiz.branchId}
                          </span>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                        <div className="absolute -bottom-4 -right-2 w-16 h-16 rounded-full bg-white/10" />
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {quiz.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-muted/60 p-3 text-center">
                            <div className="text-2xl font-bold text-foreground">{quiz.totalQuestions}</div>
                            <div className="text-xs text-muted-foreground">Questions</div>
                          </div>
                          <div className="rounded-xl bg-muted/60 p-3 text-center">
                            <div className="text-2xl font-bold text-foreground">{quiz.timeLimit}m</div>
                            <div className="text-xs text-muted-foreground">Time Limit</div>
                          </div>
                        </div>

                        {/* Question types */}
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                            {mcqCount} MCQ
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                            {tfCount} True/False
                          </span>
                        </div>

                        {/* Difficulty breakdown */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className={difficultyColors.easy + " font-medium"}>Easy</span>
                            <div className="flex-1 mx-2 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{ width: `${(easyCount / quiz.totalQuestions) * 100}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground">{easyCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className={difficultyColors.medium + " font-medium"}>Medium</span>
                            <div className="flex-1 mx-2 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-amber-500"
                                style={{ width: `${(mediumCount / quiz.totalQuestions) * 100}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground">{mediumCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className={difficultyColors.hard + " font-medium"}>Hard</span>
                            <div className="flex-1 mx-2 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-red-500"
                                style={{ width: `${(hardCount / quiz.totalQuestions) * 100}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground">{hardCount}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className={`mt-2 flex items-center justify-between font-semibold text-sm bg-gradient-to-r ${quiz.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                          <span>Start Quiz</span>
                          <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
