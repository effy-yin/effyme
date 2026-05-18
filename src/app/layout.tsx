import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Pacifico } from "next/font/google";
import { SvgSprites } from "./svg-sprites";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Effy Yin — Frontend Developer",
  description:
    "Frontend Engineer for SaaS, Fintech, AI, web3. Simplicity is my superpower.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable} ${pacifico.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="min-h-full overflow-x-hidden font-sans">
        <SvgSprites />
        {children}
      </body>
    </html>
  );
}
