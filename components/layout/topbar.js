import { PureComponent } from 'react'
import Link from 'next/link'

export default class TopBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { burgerActive: false }
  }

  toggleBurger = () => this.setState({ burgerActive: !this.state.burgerActive })

  render() {
    return (
      <nav className='navbar has-shadow is-white'>
        <div className='navbar-brand'>
          <Link prefetch href='/'>
            <a className='navbar-item'>
              <h4 className='title is-4'>LQM</h4>
            </a>
          </Link>
          <a className={`navbar-burger ${this.state.burgerActive ? 'is-active' : ''}`} onClick={this.toggleBurger}>
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className={`navbar-menu ${this.state.burgerActive ? 'is-active' : ''}`}>
          <div className='navbar-start'>
            <Link prefetch href='/posts/day-khong-phai-blog-cong-nghe-dau'>
              <a className='navbar-item'>
                <ion-icon name='information-circle-outline' />
                &nbsp;About
              </a>
            </Link>
            <Link prefetch href='https://github.com/lqmanh/lqm'>
              <a className='navbar-item'>
                <ion-icon name='logo-github' />
                &nbsp;Github
              </a>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
