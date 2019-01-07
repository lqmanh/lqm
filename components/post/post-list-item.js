import Link from 'next/link'

import PostMeta from '../post-meta'


export default (props) => (
  <div className='card'>
    {props.headerImage ? (
      <div class="card-image">
        <figure class="image is-4by3">
          <img src={props.headerImage} />
        </figure>
      </div>
    ) : null}
    <div className='card-content'>
      <h4 className='title is-4'>
        <Link prefetch href={`/posts/${props.slug}`}>
          <a>{props.title}</a>
        </Link>
      </h4>
      <h6 className='subtitle is-6'><em>{props.description}</em></h6>
      <PostMeta tags={props.tags} publicationDate={props.publicationDate} />
    </div>
    <style jsx>{`
      .card {
        border-radius: 0.5rem;
      }
      .card:not(:last-child) {
        margin-bottom: 3rem;
      }
      img {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }
    `}</style>
  </div>
)
