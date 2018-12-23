import Layout from '../components/layout'
import PostList from '../components/post/post-list'


export default (props) => (
  <Layout>
    <section className='section columns is-centered is-mobile'>
      <div className='column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen'>
        <PostList />
      </div>
    </section>
  </Layout>
)
