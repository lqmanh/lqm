import { withRouter } from 'next/router'

import Layout from '../components/layout'
import PostContent from '../components/post/post-content'


export default withRouter((props) => (
  <Layout>
    <section className='section columns is-centered is-mobile'>
      <div className='column is-10-mobile is-8-tablet is-6-desktop'>
        <PostContent slug={props.router.query.slug} />
      </div>
    </section>
  </Layout>
))
