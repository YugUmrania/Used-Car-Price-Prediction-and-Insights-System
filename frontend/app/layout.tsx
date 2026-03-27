import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CarVal AI — Used Car Price Predictor",
  description:
    "Predict the fair market value of any used car instantly using advanced AI and machine learning. Get accurate price estimates powered by XGBoost.",
  keywords: [
    "used car price prediction",
    "car valuation",
    "AI car pricing",
    "XGBoost prediction",
    "resale value estimator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Background Orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        {children}
      </body>
    </html>
  );
}
