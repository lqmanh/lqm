import Head from 'next/head'

import PostMeta from './post-meta'
import Share from '../share'

const ORIGIN = 'https://lqm.now.sh'

export default (props) => {
  const url = `${ORIGIN}/posts/${props.slug}`
  const content = require(`../../content/${props.slug}.json`)
  return (
    <>
      <Head>
        <title>{content.title} &ndash; LQM by Lương Quang Mạnh</title>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={content.title} />
        <meta property='og:description' content={content.description} />
        <meta property='og:image' content={`${ORIGIN}${content.headerImage}`} />
      </Head>
      <article className='content' dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
      <PostMeta
        tags={content.tags}
        publicationDate={content.publicationDate}
        lastUpdatedDate={content.lastUpdatedDate}
      />
      <Share url={url} />
    </>
  )
}
