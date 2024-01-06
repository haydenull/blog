import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '启封 Hayden',
  description: '启封 Hayden 的个人网站',
  icons: {
    icon: '/assets/avatar.png',
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
