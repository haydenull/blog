// @ts-expect-error - no types
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error - no types
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CopyButton from './CopyButton'

const CodeBlock = ({
  text,
  language,
  highlightLines = [],
  ...props
}: {
  text: string
  highlightLines?: number[]
  language: string
}) => {
  return (
    <details className="code-block relative rounded bg-[#1D2021]" open>
      <summary className="cursor-pointer px-8 pb-3 pt-3 text-sm text-white">{language}</summary>
      <SyntaxHighlighter
        wrapLines
        showLineNumbers
        style={atomDark}
        language={language}
        PreTag="div"
        className="code-container !my-0 bg-transparent !px-2 !pt-0 text-sm"
        lineProps={(lineNumber: number) => {
          if (highlightLines.includes(lineNumber)) {
            return { class: 'highlighted-line' }
          }
          return {}
        }}
        {...props}
      >
        {text}
      </SyntaxHighlighter>
      <CopyButton text={text} />
    </details>
  )
}

export default CodeBlock
