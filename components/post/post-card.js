import Link from 'next/link'

import PostMeta from '../post-meta'

export default (props) => {
  const { title, description, headerImage, publicationDate, lastUpdatedDate, tags } = props.meta
  return (
    <div className='card'>
      {headerImage ? (
        <div className='card-image'>
          <figure className='image'>
            <img src={headerImage} />
          </figure>
        </div>
      ) : null}
      <div className='card-content'>
        <h5 className='title is-5'>
          <Link prefetch href={`/posts/${props.slug}`}>
            <a>{title}</a>
          </Link>
        </h5>
        <h6 className='subtitle is-6'>
          <em>{description}</em>
        </h6>
        <PostMeta tags={tags} publicationDate={publicationDate} lastUpdatedDate={lastUpdatedDate} />
      </div>
      <style jsx>{`
        img {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          max-height: 50vh;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}
