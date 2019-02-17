import Head from 'next/head'

import Layout from '../components/layout'
import PostList from '../components/post/post-list'
import PinnedPostList from '../components/post/pinned-post-list'
import FeaturedPostList from '../components/post/featured-post-list'
const { children: posts } = require('../content/.dirstat.json')

const LeftSideBar = () => (
  <>
    <PinnedPostList posts={posts} />
    <FeaturedPostList posts={posts} />
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
            <PostList posts={posts} />
          </div>
        </div>
      </section>
    </Layout>
  </>
)
