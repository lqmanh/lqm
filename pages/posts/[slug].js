import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../../components/layout'
import PostContent from '../../components/post/post-content'

const Post = (props) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout withTopBar={true}>
      <section className='section columns is-centered is-mobile'>
        <div className='column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen'>
          <PostContent slug={slug} content={props.content} />
        </div>
      </section>
    </Layout>
  )
}

Post.getInitialProps = async (ctx) => {
  const { req } = ctx
  const { slug } = ctx.query
  const baseURL = req ? `http://${req.headers.host}` : undefined
  const { data: content } = await axios.get(`/api/post?slug=${slug}`, { baseURL })
  return { content }
}

export default Post
