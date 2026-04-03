import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SettleGuard Autopilot — Autonomous Revenue Recovery for Paytm Merchants",
  description: "AI agent that automatically detects overcharges, files claims, and recovers money for Paytm merchants and digital businesses — across Paytm Payment Gateway, Amazon, Flipkart, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
