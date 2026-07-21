import type { Metadata } from "next";
import { magion, sinter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "LABB Studio — Bielsko-Biała",
  description:
    "Studio fotograficzno-filmowe do wynajęcia w centrum Bielska-Białej.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${magion.variable} ${sinter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
      </body>
    </html>
  );
}
