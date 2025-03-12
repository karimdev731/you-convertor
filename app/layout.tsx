import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./responsive.css"; // Add our responsive CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "You Convertor - Convertissez vos vidéos YouTube en MP3 et MP4",
  description:
    "Convertissez facilement vos vidéos YouTube préférées en fichiers MP3 ou MP4 avec différentes résolutions disponibles. Service rapide, sécurisé et gratuit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
