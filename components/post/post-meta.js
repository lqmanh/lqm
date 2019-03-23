import dayjs from 'dayjs'

import TagList from '../tag-list'

export default (props) => {
  let date, text
  if (props.lastUpdatedDate) {
    date = props.lastUpdatedDate
    text = 'Updated'
  } else {
    date = props.publicationDate
    text = 'Published'
  }
  return (
    <div className='level'>
      <div className='level-left'>
        <div className='level-item'>{props.tags.length ? <TagList tags={props.tags} /> : null}</div>
      </div>
      <div className='level-right'>
        <div className='level-item'>
          <ion-icon name='calendar' />
          &nbsp;
          {`${text} on ${dayjs(date).format('ddd, DD MMM YYYY')}`}
        </div>
      </div>
    </div>
  )
}
