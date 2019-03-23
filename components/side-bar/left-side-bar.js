import Link from 'next/link'

import { PinnedPosts, FeaturedPosts, LastUpdatedPosts } from '../post/post-bullets'

const Intro = () => (
  <section className='section'>
    <h1 className='title is-1'>LQM</h1>
    <h5 className='subtitle is-5'>
      <em>by Lương Quang Mạnh</em>
    </h5>
    <nav className='level is-mobile'>
      <Link prefetch href='/posts/day-khong-phai-blog-cong-nghe-dau'>
        <a className='level-item'>
          <ion-icon name='information-circle-outline' />
          &nbsp;About
        </a>
      </Link>
      <Link prefetch href='https://github.com/lqmanh/lqm'>
        <a className='level-item'>
          <ion-icon name='logo-github' />
          &nbsp;Github
        </a>
      </Link>
    </nav>
  </section>
)

export default ({ posts }) => (
  <>
    <Intro />
    <PinnedPosts posts={posts} />
    <FeaturedPosts posts={posts} />
    <LastUpdatedPosts posts={posts} />
  </>
)
