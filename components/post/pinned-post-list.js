import dayjs from 'dayjs'

import PostBullet from './post-bullet'
let { children: posts } = require('../../content/.dirstat.json')

export default () => {
  posts = posts.filter((post) => post.meta.pinned && post.meta.published)
  posts.sort((a, b) => {
    if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
    return -1
  })
  return (
    <div className='card'>
      <header className='card-header'>
        <h4 className='card-header-title title is-4'>
          <ion-icon name='bookmark' />
          &nbsp;Pinned Posts
        </h4>
      </header>
      <div className='card-content'>
        {posts.map((post, i) => (
          <PostBullet slug={post.path.name} meta={post.meta} key={i} />
        ))}
      </div>
    </div>
  )
}
