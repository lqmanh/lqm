import Link from 'next/link'

export default (props) => {
  const { title, headerImage } = props.meta
  return (
    <article className='media'>
      <div className='media-left'>
        <figure className='image'>
          <Link prefetch href={`/posts/${props.slug}`}>
            <img src={headerImage} />
          </Link>
        </figure>
      </div>
      <div className='media-content'>
        <h6 className='subtitle is-6'>
          <Link prefetch href={`/posts/${props.slug}`}>
            <a>{title}</a>
          </Link>
        </h6>
      </div>
      <style jsx>{`
        img {
          cursor: pointer;
          object-fit: cover;
          width: 64px;
          height: 64px;
        }
      `}</style>
    </article>
  )
}
