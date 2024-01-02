import Afdian from 'afdian'

import { Aifadian as AifadianLogo } from '@/assets'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

import BentoCard from './BentoCard'

const afdian = new Afdian({
  userId: process.env.AiFaDian_User_ID!,
  token: process.env.AiFaDian_API_Token!,
})

const AiFaDian = async () => {
  const res = await afdian.querySponsor(1)
  const sponsors = res.data.list?.sort((a, b) => Number(b.all_sum_amount) - Number(a.all_sum_amount))

  return (
    <BentoCard
      className="col-span-2 flex flex-row items-center justify-around overflow-visible bg-violet-50 dark:bg-[#65528d]"
      url="https://afdian.net/a/haydenull"
    >
      <div className="text-foreground">
        <AifadianLogo className="-ml-10 w-[220px]" />
      </div>
      {sponsors ? (
        <div className="flex">
          <AnimatedTooltip
            items={sponsors.map((sponsor) => ({
              id: sponsor.user.user_id,
              name: sponsor.user.name,
              image: sponsor.user.avatar,
              designation: sponsor.current_plan.name,
            }))}
          />
        </div>
      ) : null}
    </BentoCard>
  )
}

export default AiFaDian
