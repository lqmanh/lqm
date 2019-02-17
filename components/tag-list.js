export default ({ tags = [] }) => (
  <div className='tags is-inline-flex'>
    {tags.map((tag, i) => (
      <span className='tag is-dark' key={i}>
        {tag}
      </span>
    ))}
  </div>
)
