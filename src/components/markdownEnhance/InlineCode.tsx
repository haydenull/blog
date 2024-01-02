const InlineCode = ({ text, ...props }: { text: string }) => {
  return (
    <code className="inline-block rounded bg-zinc-200 px-2 text-sm text-colorful-500 dark:bg-zinc-800" {...props}>
      {text}
    </code>
  )
}

export default InlineCode
