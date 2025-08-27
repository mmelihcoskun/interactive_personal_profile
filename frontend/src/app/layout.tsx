import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Removed ChakraProvider import; will use in page.tsx Client Component
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
  title: "Melih Coskun's Personal Profile",
  description: "Learn more about me and my work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
  {children}
      </body>
    </html>
  );
}
