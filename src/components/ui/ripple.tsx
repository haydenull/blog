// https://magicui.design/docs/components/ripple
import React, { type CSSProperties } from 'react'

// Modify these
const MAIN_CIRCLE_SIZE = 110
const MAIN_CIRCLE_OPACITY = 0.24
const NUM_CIRCLES = 4

const Ripple = React.memo(function Ripple() {
  return (
    <div className="absolute left-1/2 top-1/2 z-0 h-full w-full overflow-visible">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          // className="absolute z-0 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-neutral-400"
          className="absolute z-0 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-violet-300/50"
          style={
            {
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            } as CSSProperties
          }
        ></div>
      ))}
    </div>
  )
})

export default Ripple
