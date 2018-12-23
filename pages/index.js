import IntroHero from '../components/intro-hero'
import Layout from '../components/layout'
import PostList from '../components/post/post-list'


export default (props) => (
  <Layout>
    <IntroHero />
    <section className='section columns is-centered'>
      <div className='column is-6'>
        <PostList />
      </div>
    </section>
  </Layout>
)
