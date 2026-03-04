import ScrollReset from "@/components/ScrollReset";
import type React from "react";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import MouseMoveEffect from "@/components/mouse-move-effect";
import JumpToTop from "@/components/jump-to-top";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
// const nunito = Nunito({ subsets: ["latin"] });q

export const metadata: Metadata = {
  title: {
    default: "AARAV SINGH – Video Editor & Motion Graphics Designer",
    template: "%s | AARAV SINGH",
  },
  description:
    "Turning raw footage into visual stories — with style, precision, and a touch of cinematic magic. AARAV SINGH specializes in Premiere Pro and After Effects — delivering cinematic edits, motion graphics, and polished storytelling.",
  keywords: [
    "AARAV SINGH",
    "Video Editor",
    "Motion Graphics Designer",
    "Premiere Pro",
    "After Effects",
    "Color Grading",
    "YouTube Video Editing",
    "Course Video Editing",
    "Visual Storytelling",
    "Freelance Video Editor",
    "Cinematic Editing",
    "Content Creator",
    "Audio Sync",
    "AARAV SINGH GAMING",
    "Professional Video Editor",
    "Motion Graphics Artist",
    "Adobe Premiere Pro Expert",
    "After Effects Editor",
    "YouTube Content Creator", 
    "Gaming Video Editing", 
    "Cinematic Transitions", 
    "High-Impact Promo Edits", 
    "Story-driven Editing", 
    "Visual Effects", 
    "Sound Design", 
    "Color Grading", 
    "Shorts Editor", 
    "Reels Video Editing", 
    "Portfolio 2026",
  ],
  authors: [{ name: "AARAV SINGH", url: "https://www.linkedin.com/in/iaaravsingh" }],
  creator: "AARAV SINGH",
  publisher: "AARAV SINGH",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.linkedin.com/in/iaaravsingh",
    title: "AARAV SINGH – Video Editor & Motion Graphics Designer",
    description:
      "Passionate Video Editor and Motion Graphics Designer delivering clean, cinematic edits and dynamic visual storytelling using Premiere Pro, and After Effects.",
    siteName: "AARAV SINGH Portfolio",
    images: [
      {
        url: "/aarav.png",
        width: 1200,
        height: 630,
        alt: "AARAV SINGH - Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AARAV SINGH – Video Editor & Motion Graphics Designer",
    description:
      "Crafting cinematic edits, motion graphics, and powerful stories. Let's make your content stand out.",
    creator: "https://x.com/XAARAVSINGH",
    images: ["/aarav.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://www.linkedin.com/in/iaaravsingh",
  },
  category: "Video Editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#020817" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "AARAV SINGH",
              url: "https://www.linkedin.com/in/iaaravsingh",
              image: "/aarav.png",
              sameAs: [
                "https://www.instagram.com/i.aaravsingh",
                "https://linkedin.com/in/iaaravsingh", 
                "https://youtube.com/@AARAVSINGHGAMING", 
                "https://x.com/XAARAVSINGH", 
              ],
              jobTitle: "Video Editor & Motion Graphics Designer",
              knowsAbout: [
                "Video Editing",
                "Motion Graphics",
                "Adobe Premiere Pro",
                "Adobe After Effects",
                "Color Grading",
                "Professional Video Editor",
                "Motion Graphics Artist",
                "Adobe Premiere Pro Expert",
                "After Effects Editor",
                "YouTube Content Creator", 
                "Gaming Video Editing", 
                "Cinematic Transitions", 
                "High-Impact Promo Edits", 
                "Story-driven Editing", 
                "Visual Effects", 
                "Sound Design", 
                "Color Grading", 
                "Shorts Editor", 
                "Reels Video Editing",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Professional Video Editing & Motion Design",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen text-white`}
        style={{
          background: "#020817",
          
        }}
      >
        <div className="grid-background-large min-h-screen">
           <ScrollReset />
           <SmoothScroll>
           <MouseMoveEffect />
            <Navbar />
            <main className="">{children}</main>
            <Footer />
            <JumpToTop />
            <Toaster position="top-center" />
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
