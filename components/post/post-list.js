import { PureComponent } from 'react'
import axios from 'axios'

import PostListItem from './post-list-item'


export default class PostList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  async componentDidMount() {
    const res = await axios.get('/api/posts')
    this.setState({ posts: res.data })
  }

  render() {
    const posts = this.state.posts
    if (!posts) return null
    return (
      <>{
        posts.map((post, i) => {
          const { name } = post.path
          const { title, description, published, publicationDate, tags } = post.content
          if (published) return (
            <PostListItem key={i} slug={name} title={title} description={description}
              publicationDate={publicationDate} tags={tags || []}
            />
          )
        })
      }</>
    )
  }
}
