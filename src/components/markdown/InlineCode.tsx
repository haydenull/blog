const InlineCode = ({ text, ...props }: { text: string }) => {
  return (
    <code className="whitespace-pre-wrap break-all rounded bg-zinc-200 px-2 text-sm text-colorful-500 dark:bg-zinc-800">
      {text}
    </code>
  )
}

export default InlineCode
