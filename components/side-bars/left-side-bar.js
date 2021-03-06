import Link from 'next/link'
import { LastUpdatedPosts, PinnedPosts } from '../post/post-bullets'

const Intro = () => (
  <section className='section'>
    <img src='/static/logo-iconic-fitted-colorful.svg' width='80' />
    <h5 className='subtitle is-5'>
      <em>
        Blog by&nbsp;
        <a href='https://cvitae.now.sh'>Lương Quang Mạnh</a>
      </em>
    </h5>
    <nav className='level is-mobile'>
      <div className='level-left'>
        <Link href='/posts/day-khong-phai-blog-cong-nghe-dau'>
          <a className='level-item'>
            <ion-icon name='information-circle-outline' />
            &nbsp;About
          </a>
        </Link>
      </div>
      <div className='level-right'>
        <a className='level-item' href='https://github.com/lqmanh/lqm'>
          <ion-icon name='logo-github' />
          &nbsp;Github
        </a>
      </div>
    </nav>
  </section>
)

const LeftSideBar = ({ posts }) => (
  <>
    <Intro />
    <PinnedPosts posts={posts} />
    <LastUpdatedPosts posts={posts} />
  </>
)

export default LeftSideBar
