import PostCard from './post-card'
import { publicationDate } from '../../utils/sort-criteria'
let { children: posts } = require('../../content/.dirstat.json')

export default () => {
  posts = posts.filter((post) => post.meta.published)
  posts.sort(publicationDate)
  return (
    <>
      {posts.map((post, i) => (
        <PostCard slug={post.path.name} meta={post.meta} key={i} />
      ))}
    </>
  )
}
