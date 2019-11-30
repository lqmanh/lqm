import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './post-card'

export default () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: posts } = await axios.get('/api/posts?sortBy=publicationDate')
      setPosts(posts)
    }
    fetchData()
  }, [])

  if (!posts.length) return null
  return (
    <>
      {posts.map((post, i) => (
        <PostCard slug={post.path.name} meta={post.meta} key={i} />
      ))}
    </>
  )
}
