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
  title: 'Adithya Krishnan - Software Developer',
  description: 'Software developer focused on building scalable web applications and distributed systems.',
  keywords: ['Software Developer', 'Full Stack', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Adithya Krishnan' }],
  creator: 'Adithya Krishnan',
  openGraph: {
    title: 'Adithya Krishnan - Software Developer',
    description: 'Software developer focused on building scalable web applications and distributed systems.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

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
