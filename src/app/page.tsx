import { Beam } from '@/assets'
import Header from '@/components/Header'
import { GridBackground } from '@/components/ui/grid-background'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <GridBackground className="absolute -z-10 h-28 md:h-40" />
      {/* <Beam /> */}
      <div className="h-28 bg-transparent md:h-40"></div>
      <div className="bg-white">
        <h1 className="text-3xl font-bold">Welcome to Next.js!</h1>
        <p className="mt-4">
          Get started by editing <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">pages/index.js</code>
        </p>
      </div>
    </main>
  )
}
