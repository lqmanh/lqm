export default (props) => (
  <section className='hero is-medium'>
    <div className='hero-body'>
      <div className='container has-text-centered'>
        <h1 className='title is-1'>LQM</h1>
      </div>
    </div>
    <style jsx>{`
      .hero {
        background-attachment: fixed;
        background-image: url(/static/intro-hero.jpg);
        background-position: center center;
        background-size: cover;
      }
      .title {
        letter-spacing: 0.25rem;
      }
    `}</style>
  </section>
)
