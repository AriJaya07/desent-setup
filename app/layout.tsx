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
  title: "monis.rent — Design Your Bali Workspace",
  description:
    "A playful, visual configurator that lets you build your dream Bali workspace and see it come to life before you rent it.",
  openGraph: {
    title: "monis.rent — Design Your Bali Workspace",
    description:
      "Build your dream remote work setup in Bali. Pick furniture, add accessories, and rent it all with free delivery.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
