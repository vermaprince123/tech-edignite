import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { siteInfo } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-edignite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // Title template: child pages set `title: "My Page"` → renders as "My Page | Tech Edignite"
  title: {
    default: `${siteInfo.name} — ${siteInfo.tagline}`,
    template: `%s | ${siteInfo.name}`,
  },

  description: siteInfo.description,

  keywords: [
    "SVNIT", "SVNIT Surat", "Tech Edignite", "Edignite NGO",
    "Engineering Blogs", "SVNIT Engineering", "B.Tech SVNIT",
    "Computer Science Engineering", "CSE SVNIT",
    "Electronics Communication Engineering", "ECE SVNIT",
    "Electrical Engineering", "EE SVNIT",
    "Mechanical Engineering", "ME SVNIT",
    "Civil Engineering", "CE SVNIT",
    "Chemical Engineering", "CHE SVNIT",
    "Information Technology", "IT SVNIT",
    "DSA Java", "Data Structures Algorithms",
    "Engineering Quiz", "SVNIT Quiz",
    "Engineering Education India",
    "Student Resources SVNIT",
    "GATE Preparation", "Placement Preparation",
    "Sardar Vallabhbhai National Institute of Technology",
    "Engineering Notes", "Semester Resources",
  ],

  authors: [{ name: siteInfo.name, url: siteInfo.edigniteUrl }],
  creator: siteInfo.name,
  publisher: "Edignite NGO",

  openGraph: {
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    url: BASE_URL,
    siteName: siteInfo.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${siteInfo.name} Logo`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    images: ["/logo.png"],
    creator: "@edignite",
    site: "@edignite",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },

  manifest: "/manifest.json",
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
