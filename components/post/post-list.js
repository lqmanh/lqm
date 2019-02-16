import dayjs from 'dayjs'

import PostCard from './post-card'
let { children: posts } = require('../../content/.dirstat.json')

export default () => {
  posts = posts.filter((post) => post.meta.published)
  posts.sort((a, b) => {
    if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
    return -1
  })
  return (
    <>
      {posts.map((post, i) => (
        <PostCard slug={post.path.name} meta={post.meta} key={i} />
      ))}
    </>
  )
}
