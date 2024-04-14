// import BMC from 'buymeacoffee.js'
import BentoCard from './BentoCard'

// https://developers.buymeacoffee.com/#/apireference?id=all-supporters
// const coffee = new BMC(process.env.Buymeacoffee_Access_Token)

const Buymeacoffee = () => {
  // const gif =
  //   theme === 'dark'
  //     ? 'https://media2.giphy.com/media/RETzc1mj7HpZPuNf3e/giphy.webp?cid=dda24d50mv2ep24qut6cd26gr6xeg02la3m1qwj08sts9yl5&ep=v1_gifs_gifId&rid=giphy.webp&ct=s'
  //     : 'https://media4.giphy.com/media/GNBCVMv6XobnMUMYJG/giphy.webp?cid=dda24d50gziurnzx3irbwbndv2vo1yk92af0w0krd426i1m6&ep=v1_gifs_gifId&rid=giphy.webp&ct=g'
  const gif = 'https://media.giphy.com/media/wQalJEIkSWUaVTXHHB/giphy.gif'
  // const { data: supporters } = await coffee.Supporters()
  // console.log('[faiz:] === supporters', supporters)
  // // 按照捐赠的杯数排序
  // const sortedSupporters = supporters
  //   // @ts-expect-error 没有类型
  //   .sort((a, b) => b.support_coffees - a.support_coffees)
  //   // @ts-expect-error 没有类型
  //   .map((item) => ({
  //     id: item.payer_email,
  //     name: item.payer_name,
  //     image: 'https://cdn.buymeacoffee.com/uploads/profile_pictures/default/v2/EFC16D/AT.png',
  //   }))

  return (
    <BentoCard
      className="group relative col-span-2 flex flex-row items-center justify-center bg-yellow-50 p-0 dark:bg-yellow-300 dark:bg-opacity-60"
      url="https://buymeacoffee.com/haydenull"
    >
      <img className="w-[40%]" src="/assets/bmc-full-logo-no-background.png" />
      <div className="absolute right-0 h-full opacity-70 transition-opacity group-hover:opacity-70 md:opacity-0">
        <img src={gif} className="h-full" />
      </div>
    </BentoCard>
  )
}

export default Buymeacoffee
