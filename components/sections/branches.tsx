"use client";

import { motion } from "framer-motion";
import { branches } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Branches() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore by Branch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover blogs and resources tailored to your engineering branch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="text-4xl mb-4">{branch.icon}</div>
                  <CardTitle className="text-xl">{branch.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {branch.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
          ))}
        </div>
      </div>
    </section>
  );
}
