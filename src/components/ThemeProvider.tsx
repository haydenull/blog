'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    if (!theme) {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 18) {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }
  }, [theme, setTheme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
