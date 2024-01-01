import { cn } from '@/lib/utils'

const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'flex h-[175px] flex-col justify-between overflow-hidden rounded-xl border bg-white p-6 text-white dark:bg-background',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default BentoCard
