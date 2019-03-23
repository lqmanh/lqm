import Head from 'next/head'

import PostMeta from './post-meta'
import Share from '../share'

export default (props) => {
  const content = require(`../../content/${props.slug}.json`)
  const origin = 'https://lqm.now.sh'
  const url = `${origin}/posts/${props.slug}`
  return (
    <>
      <Head>
        <title>{content.title} &ndash; LQM</title>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={content.title} />
        <meta property='og:description' content={content.description} />
        <meta property='og:image' content={`${origin}${content.headerImage}`} />
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
