import Layout from '../components/layout'
import PostList from '../components/post/post-list'


export default (props) => (
  <Layout>
    <section className='section columns is-centered is-mobile'>
      <div className='column is-10-mobile is-8-tablet is-6-desktop'>
        <PostList />
      </div>
    </section>
  </Layout>
)
