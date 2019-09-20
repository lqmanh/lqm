import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import PostContent from '../../components/post/post-content'

const Post = () => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout withTopBar={true}>
      <section className='section columns is-centered is-mobile'>
        <div className='column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen'>
          <PostContent slug={slug} />
        </div>
      </section>
    </Layout>
  )
}

Post.getInitialProps = async () => {
  return {} // Do NOT need to read query from ctx
}

export default Post
