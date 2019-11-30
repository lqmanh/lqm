import PostCard from './post-card'

export default ({ posts = [] }) => {
  return (
    <>
      {posts.map((post, i) => (
        <PostCard slug={post.path.name} meta={post.meta} key={i} />
      ))}
    </>
  )
}
