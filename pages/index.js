import Head from 'next/head'

import Layout from '../components/layout'
import PostCards from '../components/post/post-cards'
import PostList from '../components/post/post-list'
const { children: posts } = require('../content/.dirstat.json')

const LeftSideBar = () => (
  <>
    <PostList posts={posts} type='pinned' />
    <PostList posts={posts} type='featured' />
  </>
)

export default () => (
  <>
    <Head>
      <title>LQM</title>
    </Head>
    <Layout left={<LeftSideBar />}>
      <section className='section'>
        <div className='columns is-centered'>
          <div className='column is-12-tablet is-10-desktop is-8-widescreen is-6-fullhd'>
            <PostCards posts={posts} />
          </div>
        </div>
      </section>
    </Layout>
  </>
)
