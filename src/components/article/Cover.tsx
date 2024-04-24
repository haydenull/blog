import NextImageWithBlur from '../NextImageWithBlur'

const Cover = ({ url, alt }: { url?: string; alt: string }) => {
  if (!url) return null
  return (
    <div className="w-full overflow-hidden rounded-3xl shadow-2xl md:-ml-[10%] md:w-[120%] dark:opacity-80">
      <NextImageWithBlur priority className="w-full" src={url} alt={alt} width={1280} height={720} />
    </div>
  )
}

export default Cover
