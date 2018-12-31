import Link from 'next/link'
import dayjs from 'dayjs'

import TagList from '../tag-list'


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
        <Link prefetch href={`/post?slug=${props.slug}`} as={`/posts/${props.slug}`}>
          <a>{props.title}</a>
        </Link>
      </h4>
      <h6 className='subtitle is-6'><em>{props.description}</em></h6>
      <div className='level'>
        <div className='level-item'>
          <TagList tags={props.tags} />
        </div>
        <span className='level-item'>{dayjs(props.publicationDate).format('dddd, DD MMMM YYYY')}</span>
      </div>
    </div>
    <style jsx>{`
      .level-item:not(.is-narrow) {
        flex-grow: 0;
      }
    `}</style>
  </div>
)
