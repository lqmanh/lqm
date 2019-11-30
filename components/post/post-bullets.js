import PostBullet from './post-bullet'
import { lastUpdatedDate } from '../../utils/sort-criteria'

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
  posts = posts.filter((post) => post.meta.pinned)
  return <PostBullets title='PINNED' iconName='bookmark' posts={posts} />
}

const FeaturedPosts = ({ posts }) => {
  posts = posts.filter((post) => post.meta.featured)
  return <PostBullets title='FEATURED' iconName='star' posts={posts} />
}

const LastUpdatedPosts = ({ posts }) => {
  posts.sort(lastUpdatedDate)
  return <PostBullets title='LAST UPDATED' iconName='calendar' posts={posts.slice(0, 4)} />
}

export { PinnedPosts, FeaturedPosts, LastUpdatedPosts }
