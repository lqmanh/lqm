import dayjs from 'dayjs'

import TagList from './tag-list'

export default (props) => (
  <div className='level'>
    <div className='level-item'>
      <TagList tags={props.tags} />
    </div>
    <span className='level-item'>Published on: {dayjs(props.publicationDate).format('ddd, DD MMM YYYY')}</span>
    <style jsx>{`
      .level-item:not(.is-narrow) {
        flex-grow: 0;
      }
    `}</style>
  </div>
)
