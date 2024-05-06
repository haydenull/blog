import { getWeeklyFrontMatterList } from '@/lib/weekly'

import Card from './Card'

const Weekly = () => {
  const weeklyFrontMatterList = getWeeklyFrontMatterList()
  const latestWeekly = weeklyFrontMatterList?.[0]
  // 有周记的周
  const hasWeeklyWeeks = weeklyFrontMatterList.map((item) => item.week)

  if (!latestWeekly) return null

  return <Card latestWeekly={latestWeekly} hasWeeklyWeeks={hasWeeklyWeeks} />
}

export default Weekly
