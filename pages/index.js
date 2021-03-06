import axios from 'axios'
import Head from 'next/head'
import Layout from '../components/layout'
import PostCards from '../components/post/post-cards'
import LeftSideBar from '../components/side-bars/left-side-bar'

const Index = (props) => {
  const { posts } = props
  return (
    <>
      <Head>
        <title>LQM - Blog by Lương Quang Mạnh</title>
        <meta property='og:image' content='/static/logo-fulltext-spaced-colorful.png' />
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

Index.getInitialProps = async (ctx) => {
  const { req } = ctx
  const baseURL = req ? `http://${req.headers.host}` : undefined
  const { data: posts } = await axios.get('/api/posts', { baseURL })
  return { posts }
}

export default Index
