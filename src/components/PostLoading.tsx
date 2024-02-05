import PageContainer from '@/components/PageContainer'
import { Skeleton } from '@/components/ui/skeleton'

export default function PostLoading() {
  return (
    <PageContainer className="min-h-screen bg-grid-small-zinc-200 dark:bg-grid-small-zinc-700">
      <article className="prose m-auto w-full max-w-[880px] px-4 py-6 md:px-20">
        <Skeleton className="h-[220px] w-full md:h-[420px]" />
        <Skeleton className="mt-6 h-8 w-3/4 md:mt-10" />
        <div className="mt-6 flex flex-col gap-2 md:mt-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/5" />
        </div>
        <div className="mt-6 flex flex-col gap-2 md:mt-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/5" />
        </div>
        <div className="mt-6 flex flex-col gap-2 md:mt-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </article>
    </PageContainer>
  )
}
