import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

dayjs.extend(isoWeek)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeeksInYear)

const title = '个人博客'
const description = 'jaychouzzz 的个人网站'
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
        {/* microsoft clarity */}
        <Script strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "miiif83aff");`}
        </Script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <>
            <Header />
            {children}
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
