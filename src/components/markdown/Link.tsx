const Link = ({ text, href, ...props }: { text: string; href?: string }) => {
  // raw link
  if (text !== 'undefined') {
    return (
      <a className="break-all text-colorful-500 hover:underline dark:text-colorful-400" href={href} {...props}>
        {text}
      </a>
    )
  }

  // YouTube cark
  const isYouTubeLink = href && /https:\/\/www\.youtube\.com\/watch\?v=/.test(href)
  if (isYouTubeLink) {
    const videoId = href?.split('v=')[1]
    return <iframe src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`} className="h-80 w-full" />
  }

  // Twitter card
  // raw: https://x.com/hiyuekun/status/1248980662184361984?s=20
  // iframe: https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&features=e30%3D&frame=false&hideCard=false&hideThread=false&id=1248980662184361984&lang=en&origin=file%3A%2F%2F%2FApplications%2FLogseq.app%2FContents%2FResources%2Fapp%2Felectron.html%23%2F&siteScreenName=logseq&theme=dark&widgetsVersion=2615f7e52b7e0%3A1702314776716&width=550px
  // const isTwitterLink = href && /(https:\/\/x\.com|https:\/\/twitter\.com)\/.*\/status\/\d+/.test(href)
  // if (isTwitterLink) {
  //   const tweetId = href?.split('/').pop()?.split('?')[0]
  //   console.log('[faiz:] === tweetId', tweetId)
  //   return (
  //     <div className="h-auto">
  //       <iframe className="h-auto w-[550px]" src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`} />
  //     </div>
  //   )
  // }
}

export default Link
