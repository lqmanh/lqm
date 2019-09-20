import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './post-card'
import { publicationDate } from '../../utils/sort-criteria'

export default () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let { data: posts } = await axios.get('/api/posts')
      posts = posts.filter((post) => post.meta.published)
      posts.sort(publicationDate)
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
