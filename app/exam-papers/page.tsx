"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExamPapers } from "@/components/sections/exam-papers";

export default function ExamPapersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <ExamPapers />
      </main>
      <Footer />
    </div>
  );
}
