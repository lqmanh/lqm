import { withRouter } from 'next/router'

import Layout from '../components/layout'
import PostContent from '../components/post/post-content'


export default withRouter((props) => (
  <Layout>
    <section className='section columns is-centered is-mobile'>
      <div className='column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen'>
        <PostContent slug={props.router.query.slug} />
      </div>
    </section>
  </Layout>
))
