import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "You Convertor - Convertissez vos vidéos YouTube en MP3 et MP4",
  description:
    "Convertissez facilement vos vidéos YouTube préférées en fichiers MP3 ou MP4 avec différentes résolutions disponibles. Service rapide, sécurisé et gratuit.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'