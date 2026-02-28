import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Bijaya! 🎮",
  description: "An interactive birthday adventure game with 5 levels of celebration!",
  keywords: ["birthday", "game", "celebration", "interactive"],
  authors: [{ name: "NepClaw" }],
  openGraph: {
    title: "Happy Birthday Bijaya! 🎂",
    description: "Play through 5 levels of birthday fun!",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0518",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}