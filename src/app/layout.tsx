import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Career Growth Consultancy for Online Degrees`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "India's Career Advancement & Higher Education Consultancy. Personalized guidance to the right Online MBA, Executive and Degree programs from NMIMS, Amity, DY Patil, IIM, Manipal, Chandigarh University, Shoolini and GLA University.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">{children}</body>
    </html>
  );
}
