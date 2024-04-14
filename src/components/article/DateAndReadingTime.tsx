import { IconCalendarCode, IconHourglassHigh } from '@tabler/icons-react'
import dayjs from 'dayjs'

const DateAndReadingTime = ({ date, readingTime }: { date: Date; readingTime?: number }) => {
  const dateString = dayjs(date).format('YYYY/MM/DD')

  return (
    <div className="mt-10 flex items-center gap-10 text-sm !text-zinc-400 dark:!text-zinc-500">
      <time className=" flex items-center gap-1" dateTime={dateString}>
        <IconCalendarCode className="w-4" /> {dateString}
      </time>
      {readingTime ? (
        <div className="flex items-center gap-1">
          <IconHourglassHigh className="w-4" /> {readingTime} 分钟阅读
        </div>
      ) : null}
    </div>
  )
}

export default DateAndReadingTime
