import Link from 'next/link'

export default () => (
  <nav className="navbar is-transparent">
    <div className='navbar-brand'>
      <Link href='/'>
        <a className='navbar-item'>
          <ion-icon name="home" />
          &nbsp;Home
        </a>
      </Link>
    </div>
    {/* <div className='navbar-menu'>
      <div className='navbar-start'>
        <Link href='#'>
          <a className='navbar-item'>
            <ion-icon name="arrow-back" />
            &nbsp;Prev.
          </a>
        </Link>
      </div>
      <div className='navbar-end'>
        <Link href='#'>
          <a className='navbar-item'>
            Next&nbsp;
            <ion-icon name="arrow-forward" />
          </a>
        </Link>
      </div>
    </div> */}
  </nav>
)
