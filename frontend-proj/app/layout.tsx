import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- This imports your styling

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wheller | Advanced Task Management Platform",
  description: "Scalable, secure, and beautiful task management application built with Next.js and Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}