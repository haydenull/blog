import { Aifadian as AifadianLogo } from '@/assets'

import BentoCard from '../BentoCard'
import Sponsors from './Sponsors'

const AiFaDian = () => {
  return (
    <BentoCard
      className="col-span-2 flex flex-row items-center justify-around overflow-visible bg-violet-50 dark:bg-violet-500 dark:bg-opacity-75"
      url="https://afdian.com/a/haydenull"
    >
      <div className="text-foreground">
        <AifadianLogo className="-ml-10 w-[220px]" />
      </div>
      <Sponsors />
    </BentoCard>
  )
}

export default AiFaDian
