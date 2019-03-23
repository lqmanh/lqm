import Head from 'next/head'

import Layout from '../components/layout'
import LeftSideBar from '../components/left-side-bar'
import PostCards from '../components/post/post-cards'
const { children: posts } = require('../content/.dirstat.json')

export default () => (
  <>
    <Head>
      <title>LQM</title>
    </Head>
    <Layout left={<LeftSideBar posts={posts} />}>
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
