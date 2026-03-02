import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elegance Studio – Barbearia Premium',
  description: 'Onde a tradição encontra a sofisticação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}