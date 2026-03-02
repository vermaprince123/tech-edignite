"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogList } from "@/components/sections/blog-list";

function BlogListFallback() {
  return (
    <div className="py-24 md:py-32 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Suspense fallback={<BlogListFallback />}>
          <BlogList />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
