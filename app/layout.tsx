import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { MotionProvider } from "@/src/components/layout/MotionProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Brown-Lee (BlinkChandi) — Développeur Full-Stack",
    template: "%s · BlinkChandi",
  },
  description:
    "Portfolio interactif de Brown-Lee Andriamihamina : applications web, ERP métier, PWA et démos testables en direct.",
  openGraph: {
    title: "Brown-Lee (BlinkChandi) — Développeur Full-Stack",
    description:
      "Applications web, ERP sur mesure et démos interactives Desktop & Mobile.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-canvas text-fg bg-studio-glow">
        <MotionProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
