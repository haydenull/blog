import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const title = '启封 Hayden'
const description = '启封 Hayden 的个人网站'
export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/assets/avatar.png',
  },
  openGraph: {
    title,
    description,
    type: 'article',
    url: `https://haydenhayden.com`,
    images: [
      {
        url: `https://haydenhayden.com/api/og`,
        width: 1280,
        height: 720,
        alt: title,
      },
    ],
  },
  twitter: {
    title,
    description,
    images: [
      {
        url: `https://haydenhayden.com/api/og`,
        width: 1280,
        height: 720,
        alt: title,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={inter.className}>
      <head>
        {/* <link href="https://pocket.haydenhayden.com/font/MiSans-Regular/result.css" rel="stylesheet" /> */}
        {process.env.NODE_ENV !== 'development' ? (
          <script
            async
            src="https://umami.haydenhayden.com/script.js"
            data-website-id="1d3a1731-2c59-434b-bf52-b2b36b7e90da"
          ></script>
        ) : null}
        <link href="https://artalk.haydenhayden.com/dist/Artalk.css" rel="stylesheet" />
        <script async src="https://artalk.haydenhayden.com/dist/Artalk.js"></script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <>
            <Header />
            {children}
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
