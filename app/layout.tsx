import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Marketing Intelligence Monitor | Demand Spring",
  description: "Track AI marketing trends, tools, and discussions relevant to B2B marketers. Powered by Claude AI with multi-source aggregation from Reddit, Hacker News, and Product Hunt.",
  keywords: ["AI", "marketing", "B2B", "intelligence", "Demand Spring", "automation", "trends"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
