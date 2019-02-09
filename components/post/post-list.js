import dayjs from 'dayjs'

import PostListItem from './post-list-item'

export default () => {
  const posts = require('../../content/.dirstat.json').children
  posts.sort((a, b) => {
    if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
    return -1
  })
  return (
    <>
      {posts.map((post, i) => {
        const { name } = post.path
        const { title, description, headerImage, published, publicationDate, lastUpdatedDate, tags } = post.meta
        if (published)
          return (
            <PostListItem
              key={i}
              slug={name}
              title={title}
              description={description}
              headerImage={headerImage}
              publicationDate={publicationDate}
              lastUpdatedDate={lastUpdatedDate}
              tags={tags}
            />
          )
      })}
    </>
  )
}
