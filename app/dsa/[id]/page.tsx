"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { dsaProblems, dsaCategories } from "@/lib/dsa-data";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Clock, BarChart2, Tag, Copy, Check,
  ChevronLeft, ChevronRight, Lightbulb, Terminal, BookOpen, Code2,
} from "lucide-react";

// ─── Difficulty config ────────────────────────────────────────────────────────
const difficultyConfig = {
  Easy:   { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Medium: { color: "text-amber-600 dark:text-amber-400",    bg: "bg-amber-500/10 border-amber-500/20" },
  Hard:   { color: "text-red-600 dark:text-red-400",        bg: "bg-red-500/10 border-red-500/20" },
};

// ─── Java Token-based Syntax Highlighter ─────────────────────────────────────
const JAVA_KEYWORDS = new Set([
  "public","private","protected","static","void","int","long","short","byte",
  "double","float","boolean","char","String","return","new","class","interface",
  "import","package","if","else","while","for","do","switch","case","break",
  "continue","default","null","true","false","this","super","extends",
  "implements","final","abstract","try","catch","finally","throw","throws",
  "instanceof","synchronized","volatile","enum","var",
]);

const JAVA_CLASSES = new Set([
  "HashMap","HashSet","ArrayList","LinkedList","Stack","Queue","Deque",
  "PriorityQueue","TreeMap","TreeSet","List","Map","Set","Collection",
  "Iterator","System","Math","Object","Integer","Long","Double","Boolean",
  "Character","Arrays","Collections","StringBuilder","StringBuffer",
  "Scanner","Random","Optional","Stream","Comparator","Comparable",
  "TreeNode","ListNode","GraphNode","Node",
]);

const PUNCT = new Set(["{","}","(",")","[","]","<",">",";",","]);

type Token = { text: string; color: string };

// VS Code Dark+ colour palette
const CLR = {
  keyword:  "#569cd6",
  cls:      "#4ec9b0",
  string:   "#ce9178",
  number:   "#b5cea8",
  comment:  "#6a9955",
  punct:    "#d4a0ff",
  plain:    "#d4d4d4",
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // — line comment
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ text: line.slice(i), color: CLR.comment });
      break;
    }
    // — double-quoted string
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, Math.min(j + 1, line.length)), color: CLR.string });
      i = Math.min(j + 1, line.length);
      continue;
    }
    // — single-quoted char literal
    if (line[i] === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== "'") { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, Math.min(j + 1, line.length)), color: CLR.string });
      i = Math.min(j + 1, line.length);
      continue;
    }
    // — number
    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.xXbBaAfFeElL_]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: CLR.number });
      i = j;
      continue;
    }
    // — word: keyword / class / identifier
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const color = JAVA_KEYWORDS.has(word) ? CLR.keyword
                  : JAVA_CLASSES.has(word)  ? CLR.cls
                  : CLR.plain;
      tokens.push({ text: word, color });
      i = j;
      continue;
    }
    // — punctuation
    if (PUNCT.has(line[i])) {
      tokens.push({ text: line[i], color: CLR.punct });
      i++;
      continue;
    }
    // — everything else (spaces, operators)
    tokens.push({ text: line[i], color: CLR.plain });
    i++;
  }

  return tokens;
}

function CodeLine({ line }: { line: string }) {
  const tokens = tokenizeLine(line);
  if (tokens.length === 0) return <span>{"\u00a0"}</span>;
  return (
    <>
      {tokens.map((tok, idx) => (
        <span key={idx} style={{ color: tok.color }}>{tok.text}</span>
      ))}
    </>
  );
}

function JavaCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-2xl overflow-hidden border border-[#2d2d2d] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs text-[#858585] font-mono flex items-center gap-1.5">
            <Code2 className="h-3 w-3" />
            Solution.java
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-white transition-colors px-2.5 py-1 rounded-md hover:bg-white/5"
        >
          {copied
            ? <><Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!</>
            : <><Copy className="h-3.5 w-3.5" /> Copy</>
          }
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-auto bg-[#1e1e1e]" style={{ maxHeight: "540px" }}>
        <table className="w-full text-sm font-mono border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                <td
                  className="select-none text-right pr-4 pl-4 py-0.5 text-[#6e7681] text-xs border-r border-[#2d2d2d] bg-[#1e1e1e]"
                  style={{ minWidth: "3.5rem" }}
                >
                  {i + 1}
                </td>
                <td className="pl-5 pr-6 py-0.5 whitespace-pre">
                  <CodeLine line={line} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DSAProblemPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const problem = dsaProblems.find((p) => p.id === id);

  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Problem Not Found</h1>
            <Link href="/dsa" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to DSA Sheet
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const diff = difficultyConfig[problem.difficulty];
  const cat  = dsaCategories.find((c) => c.id === problem.category);
  const prev = dsaProblems.find((p) => p.id === id - 1);
  const next = dsaProblems.find((p) => p.id === id + 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/dsa" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> DSA Sheet
            </Link>
          </motion.div>

          {/* ── Header card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-border shadow-sm mb-6"
          >
            <div className={`bg-gradient-to-br ${cat?.color ?? "from-blue-500 to-cyan-500"} p-6 md:p-8 relative overflow-hidden text-white`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cat?.icon}</span>
                  <span className="text-white/70 text-sm font-medium">{problem.category}</span>
                  <span className="ml-auto text-white/60 font-mono text-sm">#{problem.id}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{problem.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white">
                    {problem.difficulty}
                  </span>
                  {problem.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 flex items-center gap-1">
                      <Tag className="h-2.5 w-2.5" />{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 right-16 w-20 h-20 rounded-full bg-white/10" />
            </div>

            {/* Complexity row */}
            <div className="bg-card px-6 py-4 flex flex-wrap gap-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Time:</span>
                <code className="font-mono font-semibold">{problem.timeComplexity}</code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BarChart2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Space:</span>
                <code className="font-mono font-semibold">{problem.spaceComplexity}</code>
              </div>
            </div>
          </motion.div>

          {/* ── Problem statement ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 mb-6"
          >
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Problem Statement
            </h2>
            <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
          </motion.div>

          {/* ── Sample I/O ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-muted-foreground">
                <Terminal className="h-4 w-4" /> Sample Input
              </h3>
              <code className="text-sm font-mono text-foreground block bg-muted rounded-xl p-3">
                {problem.sampleInput}
              </code>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-muted-foreground">
                <Terminal className="h-4 w-4" /> Sample Output
              </h3>
              <code className="text-sm font-mono text-emerald-600 dark:text-emerald-400 block bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                {problem.sampleOutput}
              </code>
            </div>
          </motion.div>

          {/* ── Approach ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 mb-6"
          >
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Lightbulb className="h-5 w-5" /> Approach & Intuition
            </h2>
            <p className="text-muted-foreground leading-relaxed">{problem.approach}</p>
          </motion.div>

          {/* ── Java Code ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mb-8"
          >
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Java Solution
              <span className="ml-auto text-xs font-mono text-muted-foreground px-2 py-1 bg-muted rounded-lg">☕ Java</span>
            </h2>
            <JavaCodeBlock code={problem.javaCode} />
          </motion.div>

          {/* ── Prev / Next ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-between gap-4"
          >
            {prev ? (
              <Link href={`/dsa/${prev.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-muted/60 transition-colors text-sm font-medium group flex-1"
              >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left overflow-hidden">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="truncate">{prev.title}</div>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            <Link href="/dsa"
              className="px-5 py-3 rounded-xl border border-border hover:bg-muted/60 transition-colors text-sm font-medium whitespace-nowrap"
            >
              All Problems
            </Link>

            {next ? (
              <Link href={`/dsa/${next.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-muted/60 transition-colors text-sm font-medium group flex-1 justify-end"
              >
                <div className="text-right overflow-hidden">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="truncate">{next.title}</div>
                </div>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div className="flex-1" />}
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
