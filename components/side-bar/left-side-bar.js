import { PinnedPosts, FeaturedPosts, LastUpdatedPosts } from '../post/post-bullets'

export default ({ posts }) => (
  <>
    <PinnedPosts posts={posts} />
    <FeaturedPosts posts={posts} />
    <LastUpdatedPosts posts={posts} />
  </>
)
