import type { Metadata } from "next";
import "./globals.css";

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
      className="antialiased"
    >
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
