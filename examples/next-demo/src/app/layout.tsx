import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Link Preview Card - Next.js Demo',
  description: 'Demo of the link-preview-card component in Next.js with RSC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 