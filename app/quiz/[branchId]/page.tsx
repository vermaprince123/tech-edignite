"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { quizzes } from "@/lib/quiz-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Trophy,
  RotateCcw,
  ArrowLeft,
  AlertCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";

type QuizState = "intro" | "active" | "result";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = params.branchId as string;

  const quiz = quizzes.find((q) => q.branchId === branchId);

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer
  useEffect(() => {
    if (quizState !== "active" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizState("result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const startQuiz = useCallback(() => {
    if (!quiz) return;
    setQuizState("active");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setTimeLeft(quiz.timeLimit * 60);
    setShowExplanation(false);
  }, [quiz]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const updated = [...userAnswers];
    updated[currentQuestion] = optionIndex;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setIsAnswered(userAnswers[currentQuestion + 1] !== null);
      setShowExplanation(false);
    } else {
      setQuizState("result");
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setIsAnswered(userAnswers[currentQuestion - 1] !== null);
      setShowExplanation(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getScore = () => {
    if (!quiz) return 0;
    return userAnswers.filter(
      (ans, i) => ans === quiz.questions[i].correctAnswer
    ).length;
  };

  const getScorePercentage = () => {
    if (!quiz) return 0;
    return Math.round((getScore() / quiz.questions.length) * 100);
  };

  const getScoreMessage = (pct: number) => {
    if (pct >= 90) return { msg: "Outstanding! 🏆", color: "text-emerald-500" };
    if (pct >= 75) return { msg: "Excellent Work! 🌟", color: "text-blue-500" };
    if (pct >= 60) return { msg: "Good Job! 👍", color: "text-violet-500" };
    if (pct >= 40) return { msg: "Keep Practicing! 💪", color: "text-amber-500" };
    return { msg: "Don't Give Up! 📚", color: "text-red-500" };
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
            <p className="text-muted-foreground mb-6">
              No quiz found for branch: <strong>{branchId}</strong>
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quizzes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const q = quiz.questions[currentQuestion];
  const score = getScore();
  const pct = getScorePercentage();
  const { msg: scoreMsg, color: scoreColor } = getScoreMessage(pct);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Quizzes
            </Link>
          </motion.div>

          {/* =========== INTRO STATE =========== */}
          <AnimatePresence mode="wait">
            {quizState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-3xl overflow-hidden border border-border shadow-lg">
                  {/* Header gradient */}
                  <div className={`bg-gradient-to-br ${quiz.color} p-8 md:p-12 relative overflow-hidden text-white`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                      <div className="text-6xl mb-4">{quiz.icon}</div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{quiz.branch}</h1>
                      <p className="text-white/80 text-lg">{quiz.description}</p>
                    </div>
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                    <div className="absolute -bottom-6 right-12 w-20 h-20 rounded-full bg-white/10" />
                  </div>

                  {/* Info cards */}
                  <div className="bg-card p-6 md:p-10">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { label: "Questions", value: quiz.totalQuestions, icon: "❓" },
                        { label: "Time Limit", value: `${quiz.timeLimit} min`, icon: "⏱️" },
                        { label: "Mix", value: "MCQ + T/F", icon: "🎯" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="text-center rounded-2xl bg-muted/60 p-4"
                        >
                          <div className="text-2xl mb-1">{item.icon}</div>
                          <div className="text-xl font-bold">{item.value}</div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Difficulty */}
                    <div className="mb-8 p-4 rounded-2xl bg-muted/40 border border-border">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Difficulty Breakdown
                      </h3>
                      <div className="space-y-2">
                        {(["easy", "medium", "hard"] as const).map((d) => {
                          const count = quiz.questions.filter(q => q.difficulty === d).length;
                          const colors = { easy: "bg-emerald-500", medium: "bg-amber-500", hard: "bg-red-500" };
                          const labels = { easy: "🟢 Easy", medium: "🟡 Medium", hard: "🔴 Hard" };
                          return (
                            <div key={d} className="flex items-center gap-3">
                              <span className="text-sm w-24">{labels[d]}</span>
                              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${colors[d]} transition-all`}
                                  style={{ width: `${(count / quiz.totalQuestions) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-6 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={startQuiz}
                      className={`w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${quiz.color} hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0`}
                    >
                      Start Quiz →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========== ACTIVE STATE =========== */}
            {quizState === "active" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className={`bg-gradient-to-r ${quiz.color} bg-clip-text text-transparent text-base font-bold`}>
                      {quiz.icon} {quiz.branchId}
                    </span>
                    <span className="text-muted-foreground">
                      · Q {currentQuestion + 1} of {quiz.questions.length}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold text-sm border ${
                      timeLeft < 60 ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-muted border-border text-foreground"
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${quiz.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question dot navigation */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {quiz.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentQuestion(i);
                        setSelectedAnswer(userAnswers[i]);
                        setIsAnswered(userAnswers[i] !== null);
                        setShowExplanation(false);
                      }}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                        i === currentQuestion
                          ? `bg-gradient-to-br ${quiz.color} text-white shadow-md scale-110`
                          : userAnswers[i] !== null
                          ? userAnswers[i] === quiz.questions[i].correctAnswer
                            ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/40"
                            : "bg-red-500/20 text-red-600 border border-red-500/40"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {/* Question card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8"
                  >
                    {/* Type + Difficulty badge */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                        {q.type === "mcq" ? "Multiple Choice" : "True / False"}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          q.difficulty === "easy"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : q.difficulty === "medium"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                        }`}
                      >
                        {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-relaxed">
                      {q.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {q.options.map((option, idx) => {
                        const isCorrect = idx === q.correctAnswer;
                        const isSelected = idx === selectedAnswer;

                        let optionClass =
                          "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium flex items-center gap-3 ";

                        if (!isAnswered) {
                          optionClass +=
                            "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
                        } else {
                          if (isCorrect) {
                            optionClass +=
                              "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                          } else if (isSelected && !isCorrect) {
                            optionClass +=
                              "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                          } else {
                            optionClass += "border-border opacity-60";
                          }
                        }

                        return (
                          <motion.button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={optionClass}
                            whileHover={!isAnswered ? { scale: 1.01 } : {}}
                            whileTap={!isAnswered ? { scale: 0.99 } : {}}
                          >
                            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-muted text-xs font-bold flex-shrink-0">
                              {["A", "B", "C", "D"][idx]}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isAnswered && isCorrect && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                            )}
                            {isAnswered && isSelected && !isCorrect && (
                              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            <Lightbulb className="h-4 w-4" />
                            {showExplanation ? "Hide" : "Show"} Explanation
                          </button>
                          <AnimatePresence>
                            {showExplanation && (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="mt-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-foreground leading-relaxed"
                              >
                                <strong className="text-blue-600 dark:text-blue-400">Explanation: </strong>
                                {q.explanation}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-muted/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r ${quiz.color} hover:opacity-90 transition-all shadow-md`}
                  >
                    {currentQuestion === quiz.questions.length - 1 ? (
                      <>Submit Quiz <Trophy className="h-4 w-4" /></>
                    ) : (
                      <>Next <ChevronRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* =========== RESULT STATE =========== */}
            {quizState === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Score card */}
                <div className="rounded-3xl overflow-hidden border border-border shadow-xl">
                  <div className={`bg-gradient-to-br ${quiz.color} p-8 md:p-12 text-white text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                      <div className="text-6xl mb-4">🏆</div>
                      <h2 className="text-3xl font-bold mb-2">{scoreMsg}</h2>
                      <div className="text-7xl font-black mb-2">{pct}%</div>
                      <p className="text-white/80 text-lg">
                        {score} / {quiz.questions.length} Correct
                      </p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
                  </div>

                  <div className="bg-card p-6 md:p-8">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { label: "Correct", value: score, color: "text-emerald-500" },
                        { label: "Wrong", value: quiz.questions.length - score - userAnswers.filter(a => a === null).length, color: "text-red-500" },
                        { label: "Skipped", value: userAnswers.filter(a => a === null).length, color: "text-amber-500" },
                      ].map((s) => (
                        <div key={s.label} className="text-center rounded-2xl bg-muted/60 p-4">
                          <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={startQuiz}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${quiz.color} hover:opacity-90 transition-all shadow-md`}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                      </button>
                      <Link
                        href="/quiz"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border border-border hover:bg-muted/60 transition-colors text-foreground"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        All Quizzes
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Answer review */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Answer Review
                  </h3>
                  <div className="space-y-4">
                    {quiz.questions.map((question, i) => {
                      const userAns = userAnswers[i];
                      const isCorrect = userAns === question.correctAnswer;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`rounded-2xl border-2 p-5 ${
                            userAns === null
                              ? "border-amber-500/30 bg-amber-500/5"
                              : isCorrect
                              ? "border-emerald-500/30 bg-emerald-500/5"
                              : "border-red-500/30 bg-red-500/5"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {userAns === null ? (
                                <span className="text-amber-500 text-lg">⏭</span>
                              ) : isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-muted-foreground">
                                  Q{i + 1}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  question.difficulty === "easy"
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : question.difficulty === "medium"
                                    ? "bg-amber-500/10 text-amber-600"
                                    : "bg-red-500/10 text-red-600"
                                }`}>
                                  {question.difficulty}
                                </span>
                              </div>
                              <p className="font-medium text-foreground mb-3">
                                {question.question}
                              </p>
                              <div className="space-y-1.5 text-sm">
                                {userAns !== null && !isCorrect && (
                                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <XCircle className="h-3.5 w-3.5 flex-shrink-0" />
                                    Your answer: {question.options[userAns]}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                                  Correct: {question.options[question.correctAnswer]}
                                </div>
                              </div>
                              <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-foreground/80">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">💡 </span>
                                {question.explanation}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
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
