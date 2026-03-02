"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { blogPosts, branches, type Branch } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogList() {
  const searchParams = useSearchParams();
  const branchParam = searchParams.get("branch") as Branch | null;
  const [selectedBranch, setSelectedBranch] = useState<Branch>(
    branchParam || "All"
  );

  const filteredPosts = useMemo(() => {
    if (selectedBranch === "All") {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.branch === selectedBranch);
  }, [selectedBranch]);

  return (
    <section className="py-24 md:py-32 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Blogs
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore educational content for all engineering branches
          </p>
        </motion.div>

        {/* Branch Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Filter by Branch:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...branches.map((b) => b.id)].map((branch) => (
              <Button
                key={branch}
                variant={selectedBranch === branch ? "default" : "outline"}
                onClick={() => setSelectedBranch(branch as Branch)}
                className="capitalize"
              >
                {branch === "All" ? "All Branches" : branch}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => {
              const postDate = new Date(post.date);
              const formattedDate = postDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-3">
                        {post.branch}
                      </span>
                      <CardTitle className="text-xl hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No blogs found for this branch. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
