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
      <div className="relative">
        <SyntaxHighlighter
          wrapLines
          showLineNumbers
          style={atomDark}
          language={language}
          PreTag="div"
          className="code-container !my-0 bg-transparent !px-2 !pt-0 text-sm"
          lineProps={(lineNumber: number) => {
            const style = {}
            if (highlightLines.includes(lineNumber)) {
              style.backgroundColor = '#383e40'
              style.width = 'fit-content'
              style.minWidth = '100%'
              style.display = 'block'
            }
            return { style }
          }}
          {...props}
        >
          {text}
        </SyntaxHighlighter>
        {/* <div className="highlight-line-container absolute left-0 top-0 -z-10 h-full w-full">
          <div></div>
          <div></div>
          <div className="highlight-line"></div>
          <div className="highlight-line"></div>
          <div className="highlight-line"></div>
        </div> */}
      </div>
      <CopyButton text={text} />
    </details>
  )
}

export default CodeBlock
