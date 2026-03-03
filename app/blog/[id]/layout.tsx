import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-edignite.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const postUrl = `${BASE}/blog/${post.id}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.branch,
      `${post.branch} SVNIT`,
      "Engineering Blog",
      "Tech Edignite",
      "SVNIT Engineering",
    ],
    authors: [{ name: post.author }],

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/logo.png"],
    },

    alternates: {
      canonical: postUrl,
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
