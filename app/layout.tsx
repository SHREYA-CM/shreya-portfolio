import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shreya Pandey | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and MERN Stack applications.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
  authors: [{ name: "Shreya Pandey" }],
  openGraph: {
    title: "Shreya Pandey | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and MERN Stack applications.",
    type: "website",
    locale: "en_US",
    siteName: "Shreya Pandey Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}