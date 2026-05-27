import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bedienungsanleitungen Finder",
  description: "Finde Bedienungsanleitungen über Schlüssel und Sprache",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
