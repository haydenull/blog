import Image, { type ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'

import { getApiUrl } from '@/lib/utils'

// const getImage = async (src: string) => {
//   const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))

//   const {
//     metadata: { height, width },
//     ...plaiceholder
//   } = await getPlaiceholder(buffer, { size: 10 })

//   return {
//     ...plaiceholder,
//     img: { src, height, width },
//   }
// }

const NextImageWithBlur = async ({ src, alt, ...nextImageProps }: ImageProps & { src: string; alt: string }) => {
  const response = await fetch(getApiUrl(`/api/img/plaiceholder?src=${src}`))
  if (response.ok) {
    try {
      // const text = await response.text()
      // console.log('fetch url ===', getApiUrl(`/api/img/plaiceholder?src=${encodeURIComponent(src)}`))
      // console.log('response text ===', text)
      // console.log('response json ===', await)
      const { base64, img } = await response.json()
      // return <img {...nextImageProps} src={src} alt={alt} />
      console.log('img', img)
      return <Image {...img} {...nextImageProps} alt={alt} blurDataURL={base64} placeholder="blur" />
    } catch (error) {
      console.error('Failed to parse json', error)
      return <img {...nextImageProps} src={src} alt={alt} />
    }
  }
  return <img {...nextImageProps} src={src} alt={alt} />
  // return <Image {...nextImageProps} src={src} alt={alt} width={100} height={100} />
}
export default NextImageWithBlur
