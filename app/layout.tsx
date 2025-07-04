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
  metadataBase: new URL("https://www.adithyakrishnan.com"),
  title: "Adithya Krishnan ",
  description: "a Software Engineer crafting Digital Experiences.",
  keywords: [
    "developer",
    "web development",
    "programming",
    "adithya krishnan",
    "adithyakrishnan",
    "adi",
    "fal3n4ngel",
    "fal3n 4ngel",
    "Mar Baselios College Of Engineering",
    "github",
    "4di krish",
    "cool",
    "awesome",
    "portfolio",
    "web developer",
    "software developer",
    "software engineer",
    "serverless",
    "dash",
    "distributed adaptive serverless hosting",
    "sde",
    "softare development engineer",
    "deflated pappadam",
    "deflated",
    "pappadam",
    "Equifax",
    "Equifax India",
    "Credit Bureau",
    "Credit Risk",
    "Identity Protection",
    "Fraud Detection",
    "Equifax Workforce Solutions",
    "Consumer Data Insights",
    "Data Breach Monitoring",
    "Financial Technology",
    "AI in Credit Risk",
    "Equifax Careers",
    "Cloud Computing",
    "Database Management",
    "Oracle",
    "Oracle India",
    "Oracle Cloud Infrastructure",
    "Java Programming",
    "Enterprise Software",

    "full stack developer",
    "front end developer",
    "back end developer",
    "mern stack developer",
    "mern stack",
    "react developer",
    "react",
    "dotnet",
    "dotnet developer",
    "dotnet core",
    ".net",
    "c#",
    "c sharp",
    "c sharp developer",
    "c sharp dotnet",
    "nextjs",
    "nissan",
    "nissan digital",
    "nissan digital india",
    "nissan digital india pvt ltd",
    "oronium",
    "programmer",
    "coding",
    "google developer",
    "google developer student clubs",
  ],
  authors: [{ name: "Adithya Krishnan" }],
  creator: "Adithya Krishnan",
  publisher: "Adithya Krishnan",
  openGraph: {
    title: "Adithya Krishnan ",
    description: "a Software Engineer crafting Digital Experiences.",
    url: "https://www.adithyakrishnan.com",
    siteName: "Adithya Krishnan's Portfolio",
    images: [
      {
        url: "https://www.adithyakrishnan.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Adithya Krishnan's Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Krishnan ",
    description: "a developer with a highly distractable brain",
    images: ["https://www.adithyakrishnan.com/logo.png"],
    creator: "@fal3n4ngel",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  alternates: {
    canonical: "https://www.adithyakrishnan.com",
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
