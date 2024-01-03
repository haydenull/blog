// @ts-expect-error - no types
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error - no types
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CopyButton from './CopyButton'

const CodeBlock = ({ text, language, ...props }: { text: string; language: string }) => {
  return (
    <div className="relative">
      <SyntaxHighlighter
        wrapLines
        showLineNumbers
        style={atomDark}
        language={language}
        PreTag="div"
        className="!p-2 text-sm"
        {...props}
      >
        {text}
      </SyntaxHighlighter>
      <CopyButton text={text} />
    </div>
  )
}

export default CodeBlock
