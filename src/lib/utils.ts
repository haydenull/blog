import { type ClassValue, clsx } from 'clsx'
import { createTwc } from 'react-twc'
import readingTime from 'reading-time'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const twx = createTwc({ compose: cn })

/*获取阅读时间*/
export function getReadingTime(article: string) {
  const readingTimeStats = readingTime(article)
  return Math.ceil(readingTimeStats.minutes)
}

export function getBaseUrl() {
  const isServer = typeof window === 'undefined'
  const vc = process.env.VERCEL_URL
  if (vc) return `https://${vc}`
  return isServer ? 'https://blog.chuanfang.com' : ''
}

export function getApiUrl(path?: string) {
  return `${getBaseUrl()}${path || ''}`
}

/** 跳转到 Google 搜索, 同时使用指定网站 https://chuanfang.org */
export const navigateToGoogleSearch = (text: string) => {
  const encodedText = encodeURIComponent(`site:chuanfang.org ${text}`)
  window.open(`https://www.google.com/search?q=${encodedText}`, '_blank')
}
