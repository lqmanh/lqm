import { PureComponent } from 'react'
import Link from 'next/link'


export default class TopBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { burgerActive: false }
  }

  toggleBurger = (event) => this.setState({ burgerActive: !this.state.burgerActive })

  render() {
    return (
      <nav className="navbar has-shadow is-light">
        <div className="navbar-brand">
          <Link prefetch href='/'><a className="navbar-item">
            <h4 className='title is-4'>LQM</h4>
          </a></Link>
          <a className={`navbar-burger ${this.state.burgerActive ? 'is-active' : ''}`} onClick={this.toggleBurger}>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div className={`navbar-menu ${this.state.burgerActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link prefetch href='/about'><a className="navbar-item">About</a></Link>
          </div>
        </div>
        <style jsx>{`
          .title {
            letter-spacing: 0.25rem;
          }
        `}</style>
      </nav>
    )
  }
}
