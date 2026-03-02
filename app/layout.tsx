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

export const metadata: Metadata = {
  title: `${siteInfo.name} - ${siteInfo.tagline} | SVNIT Surat`,
  description: siteInfo.description,
  keywords: [
    "SVNIT",
    "Engineering Blogs",
    "B.Tech",
    "Computer Science",
    "Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Student Resources",
    "Engineering Education",
  ],
  authors: [{ name: siteInfo.name }],
  openGraph: {
    title: `${siteInfo.name} - ${siteInfo.tagline}`,
    description: siteInfo.description,
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
