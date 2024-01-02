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
      colorScheme={theme as 'light' | 'dark'}
      transformData={transformData}
    />
  )
}

export default GithubCalendar
