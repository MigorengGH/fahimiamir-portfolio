import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SanityLive } from '@/sanity/lib/live'
import { AnimatedBackground } from '@/components/ui/animated-background'
import './globals.css'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Fahimi Amir — Software Engineer & Creative Video Maker',
  description:
    'Portfolio of Fahimi Amir, a software engineer and award-winning creative video maker specializing in full-stack development, software testing, and film production.',
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Fahimi Amir — Software Engineer & Creative Video Maker',
    description: 'Software Engineer & Award-Winning Creative Video Maker.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
        <AnimatedBackground />
        {children}
        <Analytics />
        <SanityLive />
      </body>
    </html>
  )
}

