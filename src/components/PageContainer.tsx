import { cn } from '@/lib/utils'

const PageContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <main className={cn('min-h-screen pt-20', className)}>{children}</main>
}

export default PageContainer
