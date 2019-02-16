export default ({ tags = [] }) => (
  <>
    <ion-icon name='pricetags' />
    &nbsp;Tags:&nbsp;
    <div className='tags is-inline-flex'>
      {tags.map((tag, i) => (
        <span className='tag' key={i}>
          {tag}
        </span>
      ))}
    </div>
  </>
)
