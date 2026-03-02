"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPosts } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 rounded-2xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-primary/20 text-primary mb-6">
              {post.branch}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">By {post.author}</p>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground first:mt-0" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 text-muted-foreground leading-relaxed" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-muted-foreground leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold text-foreground" {...props} />
                    ),
                    code: ({ node, inline, ...props }: any) => {
                      if (inline) {
                        return (
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground font-mono" {...props} />
                        );
                      }
                      return (
                        <code className="block bg-muted p-4 rounded-lg text-sm text-foreground font-mono overflow-x-auto mb-4" {...props} />
                      );
                    },
                    a: ({ node, ...props }) => (
                      <a className="text-primary hover:underline font-medium" {...props} />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>

          {/* Related Posts or CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button size="lg" asChild variant="outline">
              <Link href="/blog" className="flex items-center gap-2">
                View All Blogs
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
