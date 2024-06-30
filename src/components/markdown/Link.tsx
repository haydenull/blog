import { Tweet } from 'react-tweet'

import { cn } from '@/lib/utils'

const Link = ({ text, href, className, ...props }: { text: string; href?: string; className?: string }) => {
  // raw link
  if (text !== 'undefined') {
    return (
      <a
        {...props}
        className={cn(
          className,
          `relative left-0 break-all after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full
          after:bg-colorful-500 after:transition-all hover:text-colorful-900 hover:after:h-[calc(100%+2px)]
          hover:after:bg-colorful-500/30 dark:after:bg-colorful-800 dark:hover:text-colorful-50
          dark:hover:after:bg-colorful-600/50 [@media(hover:none)]:underline [@media(hover:none)]:decoration-colorful-500
          [@media(hover:none)]:underline-offset-4 [@media(hover:none)]:after:hidden
          dark:[@media(hover:none)]:decoration-colorful-800`,
        )}
        href={href}
      >
        {text}
      </a>
    )
  }

  // YouTube cark
  const isYouTubeLink = href && /https:\/\/www\.youtube\.com\/watch\?v=/.test(href)
  if (isYouTubeLink) {
    const videoId = href?.split('v=')[1]
    return videoId ? (
      <iframe src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`} className="h-52 w-full md:h-80" />
    ) : (
      <del>Invalid YouTube Link</del>
    )
  }

  // Twitter card
  // raw: https://x.com/hiyuekun/status/1248980662184361984?s=20
  // iframe: https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&features=e30%3D&frame=false&hideCard=false&hideThread=false&id=1248980662184361984&lang=en&origin=file%3A%2F%2F%2FApplications%2FLogseq.app%2FContents%2FResources%2Fapp%2Felectron.html%23%2F&siteScreenName=logseq&theme=dark&widgetsVersion=2615f7e52b7e0%3A1702314776716&width=550px
  const isTwitterLink = href && /(https:\/\/x\.com|https:\/\/twitter\.com)\/.*\/status\/\d+/.test(href)
  if (isTwitterLink) {
    const tweetId = href?.split('/').pop()?.split('?')[0]
    return tweetId ? (
      <div className="m-auto w-fit">
        <Tweet id={tweetId} />
      </div>
    ) : (
      <del>Invalid Twitter Link</del>
    )
  }
}

export default Link
