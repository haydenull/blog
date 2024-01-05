/* eslint-disable react/no-unknown-property */
import svgToDataUri from 'mini-svg-data-uri'
import { ImageResponse } from 'next/og'

// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(req: Request) {
  // /api/og?title=Hello&description=你好

  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const description = searchParams.get('description')

  const avatarImg = await fetch(new URL('../../../../public/assets/avatar.png', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  )
  const miSansFont = await fetch('https://pocket.haydenhayden.com/font/MiSans-Regular.ttf').then((res) =>
    res.arrayBuffer(),
  )

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full p-[50px] justify-between bg-zinc-50"
        style={{
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="#999" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
          )}")`,
        }}
      >
        <div tw="flex items-center">
          <div tw="flex w-[80px] h-[80px] rounded-full shadow overflow-hidden mr-[20px]">
            {/* @ts-expect-error src 的类型正确 */}
            <img tw="w-full h-full" src={avatarImg} />
          </div>
          <span tw="text-[38px] text-zinc-700">启封 Hayden</span>
        </div>
        <div tw="flex flex-col text-left">
          <h1 tw="text-left text-[90px] font-bold m-0">{title}</h1>
          {description ? <p tw="text-left text-[60px] text-zinc-500 m-0">{description}</p> : null}
        </div>
        <div tw="flex justify-end">
          <span tw="text-[36px] text-violet-500">HaydenHayden.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'mi-sans',
          data: miSansFont,
          style: 'normal',
        },
      ],
      emoji: 'twemoji',
    },
  )
}
