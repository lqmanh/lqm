import dayjs from 'dayjs'

import TagList from './tag-list'

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
      <div className='level-item'>
        <TagList tags={props.tags} />
      </div>
      <span className='level-item'>
        <ion-icon name='calendar' />
        &nbsp;
        {`${text} on: ${dayjs(date).format('ddd, DD MMM YYYY')}`}
      </span>
    </div>
  )
}
