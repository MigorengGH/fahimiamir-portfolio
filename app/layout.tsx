import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Fahimi Amir — Portfolio',
    template: '%s | Fahimi Amir',
  },
  description:
    'Software Engineer & Award-Winning Creative Video Maker. Building reliable software and compelling visual stories — from UKM to Petronas and beyond.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Muhammad Fahimi Amir — Portfolio',
    description: 'Software Engineer & Award-Winning Creative Video Maker.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full" style={{ background: '#09090b' }}>
        {children}
      </body>
    </html>
  )
}
