export default ({ tags = [] }) => (
  <div>
    <span>Tags:&nbsp;</span>
    <div className='tags is-inline-flex'>
      {tags.map((tag, i) => (
        <span className='tag' key={i}>
          {tag}
        </span>
      ))}
    </div>
  </div>
)
