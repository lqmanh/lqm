import Link from 'next/link'
import dayjs from 'dayjs'


export default (props) => (
  <div className='card'>
    <div className='card-content'>
      <h4 className='title is-4'>
        <Link prefetch href={`/post?slug=${props.slug}`}><a>{props.title}</a></Link>
      </h4>
      <h6 className='subtitle is-6'><em>{props.description}</em></h6>
      <div className='level'>
        <div className='level-item'>
          <span className='tags'>{
            props.tags.map((tag, i) => <span className='tag' key={i}>{tag}</span>)
          }</span>
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
