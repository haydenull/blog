import { NextResponse } from 'next/server'
import { getPlaiceholder } from 'plaiceholder'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const src = searchParams.get('src')

  if (!src) return NextResponse.json({ error: 'src is required' }, { status: 400 })

  let buffer
  try {
    buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch the img source' }, { status: 500 })
  }

  try {
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 })

    return NextResponse.json({
      ...plaiceholder,
      img: { src, height, width },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get plaiceholder' }, { status: 500 })
  }
}
