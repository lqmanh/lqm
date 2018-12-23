import { withRouter } from 'next/router'

import Layout from '../components/layout'
import PostContent from '../components/post/post-content'


export default withRouter((props) => (
  <Layout>
    <section className='section columns is-centered'>
      <div className='column is-6'>
        <PostContent slug={props.router.query.slug} />
      </div>
    </section>
  </Layout>
))
