const Link = ({ text, ...props }: { text: string }) => {
  return (
    <a className="break-all text-colorful-500 hover:underline dark:text-colorful-400" {...props}>
      {text}
    </a>
  )
}

export default Link
