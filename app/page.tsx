"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedBlogs } from "@/components/sections/featured-blogs";
import { Branches } from "@/components/sections/branches";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Branches />
        <FeaturedBlogs />
      </main>
      <Footer />
    </div>
  );
}
