import Afdian from 'afdian'

import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

const afdian = new Afdian({
  userId: process.env.AiFaDian_User_ID!,
  token: process.env.AiFaDian_API_Token!,
})

const Sponsors = async () => {
  const sponsors = await getSponsors()

  if (!sponsors.length) return null

  return (
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
  )
}

async function getSponsors() {
  try {
    const res = await afdian.querySponsor(1)
    return res.data.list?.sort((a, b) => Number(b.all_sum_amount) - Number(a.all_sum_amount)).slice(0, 5)
  } catch (error) {
    return []
  }
}

export default Sponsors
