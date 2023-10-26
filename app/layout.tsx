import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/toaster-provider'
import Favicon from '/public/favicon.ico';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Idea Generator',
  description: 'AI Platform',
  icons: [{ rel: 'icon', url: Favicon.src }],
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}</body>
      </html>
    </ClerkProvider>
  )
}
