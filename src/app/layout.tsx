import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Manish Parmar | Cinematic Reels & Professional Videography",
  description: "Professional reel creation and editing services for all occasions - weddings, events, baby showers, political campaigns, and more. Expert cinematography with trending cinematic transitions.",
  keywords: ["Manish Parmar", "Cinematic Reels", "Video Editing", "Reel Creation", "Cinematography", "Videographer", "Instagram Reels", "Event Videos", "Wedding Reels"],
  authors: [{ name: "Manish Parmar" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Manish Parmar | Cinematic Reels & Professional Videography",
    description: "Professional reel creation and editing services for all occasions.",
    url: "https://instagram.com/_manishh.creation",
    siteName: "Manish Parmar Creations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish Parmar | Cinematic Reels",
    description: "Professional reel creation and editing services for all occasions.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
