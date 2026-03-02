"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Branches } from "@/components/sections/branches";
import { motion } from "framer-motion";
import { branches, blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BranchesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-24 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Engineering Branches
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore blogs and resources for each engineering branch at SVNIT
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {branches.map((branch, index) => {
                const branchPosts = blogPosts.filter(
                  (post) => post.branch === branch.id
                );

                return (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="text-5xl mb-4">{branch.icon}</div>
                        <CardTitle className="text-2xl">{branch.name}</CardTitle>
                        <p className="text-muted-foreground mt-2">
                          {branch.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{branchPosts.length} Blogs</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog?branch=${branch.id}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                          View Blogs
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
