import dayjs from 'dayjs'

const published = (post): boolean => {
  if (!post.meta.published) return false
  return dayjs().isAfter(dayjs(post.meta.publicationDate))
}

export { published }
