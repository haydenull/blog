'use client'

import dayjs from 'dayjs'
import { useTheme } from 'next-themes'
import GitHubCalendar from 'react-github-calendar'

type Level = 0 | 1 | 2 | 3 | 4
type Activity = {
  date: string
  count: number
  level: Level
}
const GithubCalendar = () => {
  const { theme } = useTheme()
  const _theme = theme === 'dark' ? 'dark' : 'light'

  const transformData = (data: Activity[]) => {
    const threeMonthsAgo = dayjs().subtract(3, 'months')
    return data?.filter((item) => dayjs(item.date).isAfter(threeMonthsAgo)) || []
  }

  return (
    <GitHubCalendar
      username="haydenull"
      hideColorLegend
      hideMonthLabels
      hideTotalCount
      // 必须使用 _theme 做为 colorScheme 的值，否则 theme 可能是一些奇怪的值导致这个组件 crash
      colorScheme={_theme}
      transformData={transformData}
    />
  )
}

export default GithubCalendar
