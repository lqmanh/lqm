import Head from 'next/head'

import TagList from '../tag-list'


export default (props) => {
  const content = require(`../../content/${props.slug}.json`)
  return (
    <>
      <Head>
        <title>{content.title} &ndash; LQM</title>
        <meta property="og:title" content={content.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={content.headerImage} />
        <meta property="og:url" content={`/posts/${props.slug}`} />
      </Head>
      <article className='content' dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
      <TagList tags={content.tags} />
    </>
  )
}
