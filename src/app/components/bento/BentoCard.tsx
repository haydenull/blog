import { cn } from '@/lib/utils'

const BentoCard = ({ children, className, url }: { children: React.ReactNode; className?: string; url?: string }) => {
  const isEmail = url && url.includes('@')
  const href = isEmail ? `mailto:${url}` : url
  const Card = url ? 'a' : 'div'

  return (
    <Card
      href={href}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex flex-col justify-between overflow-hidden rounded-xl border bg-white p-4 text-white md:p-6 dark:bg-background',
        className,
      )}
    >
      {children}
    </Card>
  )
}

export default BentoCard
