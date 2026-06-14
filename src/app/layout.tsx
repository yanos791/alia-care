import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alia | Premium Elevated Care & Wellness",
  description: "Discover Alia, an elevated care experience bringing sanctuary, peace, and premium wellness to your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#F5EFE8] text-[#2A1F1A] antialiased selection:bg-[#c3b2a2] selection:text-white flex flex-col font-[family-name:var(--font-dm-sans)] [&_button]:cursor-pointer [&_a]:cursor-pointer [&_[role='button']]:cursor-pointer">
        {children}
      </body>
    </html>
  );
}
