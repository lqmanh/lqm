import { PinnedPosts, FeaturedPosts, LastUpdatedPosts } from '../components/post/post-list'

export default ({ posts }) => (
  <>
    <PinnedPosts posts={posts} />
    <FeaturedPosts posts={posts} />
    <LastUpdatedPosts posts={posts} />
  </>
)
