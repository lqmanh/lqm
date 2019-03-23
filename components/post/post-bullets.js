import dayjs from 'dayjs'

import PostBullet from './post-bullet'

const PostBullets = (props) => (
  <section className='section'>
    <h5 className='title is-5'>
      <ion-icon name={props.iconName} />
      &nbsp;
      {props.title}
    </h5>
    {props.posts.map((post, i) => (
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

const PinnedPosts = ({ posts }) => {
  posts = posts.filter((post) => post.meta.pinned && post.meta.published)
  return <PostBullets title='PINNED' iconName='bookmark' posts={posts} />
}

const FeaturedPosts = ({ posts }) => {
  posts = posts.filter((post) => post.meta.featured && post.meta.published)
  return <PostBullets title='FEATURED' iconName='star' posts={posts} />
}

const LastUpdatedPosts = ({ posts }) => {
  posts.sort((a, b) => {
    const dateA = a.meta.lastUpdatedDate ? a.meta.lastUpdatedDate : a.meta.publicationDate
    const dateB = b.meta.lastUpdatedDate ? b.meta.lastUpdatedDate : b.meta.publicationDate
    if (dayjs(dateB).isAfter(dayjs(dateA))) return 1
    return -1
  })
  return <PostBullets title='LAST UPDATED' iconName='calendar' posts={posts.slice(0, 3)} />
}

export { PinnedPosts, FeaturedPosts, LastUpdatedPosts }
