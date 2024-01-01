import { cn } from '@/lib/utils'

const PageContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <main className={cn('pt-20', className)}>{children}</main>
}

export default PageContainer
