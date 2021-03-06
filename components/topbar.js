import { useState } from 'react'
import Link from 'next/link'

export default () => {
  const [isMenuActive, setMenuActive] = useState(false)

  const handleMenu = () => setMenuActive(!isMenuActive)

  return (
    <nav className='navbar is-transparent'>
      <div className='navbar-brand'>
        <Link href='/'>
          <a className='navbar-item'>
            <ion-icon name='home' />
            &nbsp;Home
          </a>
        </Link>
        <a className={`navbar-burger ${isMenuActive ? 'is-active' : ''}`} role='button' onClick={handleMenu}>
          <span />
          <span />
          <span />
        </a>
      </div>
      <div className={`navbar-menu ${isMenuActive ? 'is-active' : ''}`}>
        {/* <div className='navbar-start'>
          <Link href='#'>
            <a className='navbar-item'>
              <ion-icon name='arrow-back' />
              &nbsp;Prev.
            </a>
          </Link>
        </div> */}
        <div className='navbar-end'>
          <Link href='/posts/day-khong-phai-blog-cong-nghe-dau'>
            <a className='navbar-item'>
              <ion-icon name='information-circle-outline' />
              &nbsp;About
            </a>
          </Link>
          <Link href='https://github.com/lqmanh/lqm'>
            <a className='navbar-item'>
              <ion-icon name='logo-github' />
              &nbsp;Github
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .navbar-brand > .navbar-item:first-child {
          padding-left: 1rem;
        }
        .navbar-end > .navbar-item:last-child {
          padding-right: 1rem;
        }
      `}</style>
    </nav>
  )
}
