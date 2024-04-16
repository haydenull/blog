'use client'

import Afdian, { type AfdianSponsorInfo } from 'afdian'
import { useEffect, useState } from 'react'

import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

const afdian = new Afdian({
  userId: process.env.AiFaDian_User_ID!,
  token: process.env.AiFaDian_API_Token!,
})

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<AfdianSponsorInfo[]>([])

  useEffect(() => {
    const getSponsors = async () => {
      try {
        const res = await afdian.querySponsor(1)
        const _sponsors = res.data.list?.sort((a, b) => Number(b.all_sum_amount) - Number(a.all_sum_amount))
        setSponsors(_sponsors)
      } catch (error) {
        console.error('fetch aifadian sponsors error', error)
      }
    }
    getSponsors()
  }, [])

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

export default Sponsors
