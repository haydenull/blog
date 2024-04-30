import { IconCalendarCode, IconHourglassHigh, IconCalendarUp } from '@tabler/icons-react'
import dayjs from 'dayjs'

const DateAndReadingTime = ({
  date,
  updateDate,
  readingTime,
}: {
  date: Date
  updateDate?: Date
  readingTime?: number
}) => {
  const dateString = dayjs(date).format('YYYY/MM/DD')
  const updateDateString = updateDate ? dayjs(updateDate).format('YYYY/MM/DD') : null

  return (
    <div className="gap-row mt-10 flex flex-wrap items-center gap-x-10 gap-y-2 text-sm !text-zinc-400 dark:!text-zinc-500">
      {updateDateString ? (
        <time className=" flex items-center gap-1" dateTime={updateDateString}>
          <IconCalendarUp className="w-4" /> 更新于 {updateDateString}
        </time>
      ) : null}
      <time className=" flex items-center gap-1" dateTime={dateString}>
        <IconCalendarCode className="w-4" /> {updateDateString ? '创建于 ' : ''}
        {dateString}
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
