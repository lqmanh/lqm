import dayjs from 'dayjs'

import PostBullet from './post-bullet'

export default (props) => {
  let { posts, type } = props
  posts = posts.filter((post) => post.meta[type] && post.meta.published)
  posts.sort((a, b) => {
    if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
    return -1
  })

  let iconName
  if (type === 'pinned') iconName = 'bookmark'
  else if (type === 'featured') iconName = 'star'

  return (
    <section className='section'>
      <h5 className='title is-5'>
        <ion-icon name={iconName} />
        &nbsp;
        {type.toUpperCase()}
      </h5>
      {posts.map((post, i) => (
        <PostBullet slug={post.path.name} meta={post.meta} key={i} />
      ))}
      <style jsx>{`
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  )
}
