import { useCallback } from 'react'

const PageButton = (props) => {
  const { onClick, children } = props

  return (
    <span onClick={onClick}>
      {children}
      <style jsx>{`
        span {
          cursor: ${onClick ? 'pointer' : 'default'};
          padding: 1rem 0.5rem;
          text-align: center;
        }
        span:not(:last-child) {
          border-bottom: 1px solid rgba(219, 219, 219, 0.5);
        }
        span:hover {
          opacity: 0.85;
        }
      `}</style>
    </span>
  )
}

const ScrollButton = (props) => {
  const { direction } = props

  const scroll = useCallback(() => {
    if (direction === 'up') window.scrollTo({ top: 0, behavior: 'smooth' })
    else if (direction === 'down') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, [])

  return (
    <PageButton onClick={scroll}>
      <ion-icon name={`arrow-${direction}`} style={{ fontSize: 24 }} />
    </PageButton>
  )
}

const PageButtons = () => (
  <div className='is-flex has-background-dark has-text-white'>
    <ScrollButton direction='up' />
    <ScrollButton direction='down' />
    <style jsx>{`
      div {
        flex-direction: column;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 1;
        border-radius: 0.5rem;
      }
    `}</style>
  </div>
)

export default PageButtons
