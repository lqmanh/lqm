import Head from 'next/head'

import Layout from '../components/layout'
import PostList from '../components/post/post-list'
import PinnedPostList from '../components/post/pinned-post-list'

export default () => (
  <>
    <Head>
      <title>LQM</title>
    </Head>
    <Layout>
      <section className='section'>
        <div className='container is-fluid'>
          <div className='columns'>
            <div className='column is-4'>
              <PinnedPostList />
            </div>
            <div className='column is-8'>
              <PostList />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  </>
)
