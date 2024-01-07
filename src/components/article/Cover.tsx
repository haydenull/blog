import Image from 'next/image'

const Cover = ({ url, alt }: { url?: string; alt: string }) => {
  if (!url) return null
  return (
    <div className="w-full overflow-hidden rounded-3xl shadow-2xl md:-ml-[10%] md:w-[120%]">
      <Image priority className="w-full" src={url} alt={alt} width={1280} height={720} />
    </div>
  )
}

export default Cover
