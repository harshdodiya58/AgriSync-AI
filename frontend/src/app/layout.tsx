import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AgriSync AI — Farm-to-Market Intelligence Platform",
  description: "AI-Powered Farm-to-Market Synchronization Platform. Predict yields, forecast demand, and optimize supply chains with intelligent analytics.",
  keywords: "agriculture, AI, farm, market, supply chain, yield prediction, demand forecast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
