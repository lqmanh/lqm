import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Layout from '../components/layout'
import LeftSideBar from '../components/side-bar/left-side-bar'
import PostCards from '../components/post/post-cards'

export default () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: posts } = await axios.get('/api/posts')
      setPosts(posts)
    }
    fetchData()
  }, [])

  if (!posts.length) return null
  return (
    <>
      <Head>
        <title>LQM by Lương Quang Mạnh</title>
      </Head>
      <Layout left={<LeftSideBar posts={posts} />}>
        <section className='section'>
          <div className='columns is-centered'>
            <div className='column is-12-tablet is-10-desktop is-8-widescreen'>
              <PostCards posts={posts} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
