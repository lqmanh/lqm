import Head from 'next/head'
import Share from '../share'
import PostMeta from './post-meta'

const ORIGIN = 'https://lqm.now.sh'

const Article = (props) => <article className='content' dangerouslySetInnerHTML={{ __html: props.html }} />

const Album = (props) => (
  <article className='content'>
    <h1>{props.title}</h1>
    {props.photoUrls.map((url, i) => (
      <img src={url} key={i} />
    ))}
    <style jsx>{`
      img:not(:last-child) {
        margin-bottom: 3rem;
      }
    `}</style>
  </article>
)

export default (props) => {
  const url = `${ORIGIN}/posts/${props.slug}`
  const { content } = props
  let ogImage = content.headerImage || '/static/default.jpg'
  if (!ogImage.startsWith('http')) ogImage = ORIGIN + ogImage

  return (
    <>
      <Head>
        <title>{content.title} | LQM - Blog by Lương Quang Mạnh</title>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={content.title} />
        <meta property='og:description' content={content.description} />
        <meta property='og:image' content={ogImage} />
      </Head>
      {content.type === 'album' ? (
        <Album title={content.title} photoUrls={content.photoUrls} />
      ) : (
        <Article html={content.bodyHtml} />
      )}
      <PostMeta
        tags={content.tags}
        publicationDate={content.publicationDate}
        lastUpdatedDate={content.lastUpdatedDate}
      />
      <Share url={url} />
    </>
  )
}
