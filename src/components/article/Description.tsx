const Description = ({ description }: { description?: string }) => {
  if (!description) return null

  return <p className="!my-5 !text-sm !text-zinc-400 dark:!text-zinc-500">{description}</p>
}

export default Description
