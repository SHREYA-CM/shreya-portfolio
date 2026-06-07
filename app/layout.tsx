import type { Metadata } from "next";
import "./globals.css";|

export const metadata: Metadata = {
  title: "Shreya Pandey | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and MERN Stack applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}