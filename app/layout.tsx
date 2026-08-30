import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adithyakrishnan.com"),
  title: "Adithya Krishnan",
  description:
    "Software Engineer crafting exceptional digital experiences. Specialized in full-stack development, cloud architecture, and modern web technologies.",
  keywords: [
    "Adithya Krishnan",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "fal3n4ngel",
    "Equifax",
    "Nissan Digital",
  ],
  authors: [{ name: "Adithya Krishnan" }],
  creator: "Adithya Krishnan",
  openGraph: {
    title: "Adithya Krishnan",
    description:
      "Software Engineer crafting exceptional digital experiences with modern web technologies.",
    url: "https://www.adithyakrishnan.com",
    siteName: "Adithya Krishnan",
    images: [{ url: "https://www.adithyakrishnan.com/logo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Krishnan",
    description: "Software Engineer crafting exceptional digital experiences",
    images: ["https://www.adithyakrishnan.com/logo.png"],
    creator: "@fal3n4ngel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico", apple: "/logo.png", shortcut: "/logo.png" },
  alternates: { canonical: "https://www.adithyakrishnan.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
