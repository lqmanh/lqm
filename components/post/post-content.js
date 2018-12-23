import { PureComponent } from 'react'
import axios from 'axios'


export default class PostContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { post: null }
  }

  async componentDidMount() {
    const res = await axios.get(`/api/posts?slug=${this.props.slug}`)
    this.setState({ post: res.data })
  }

  render() {
    const post = this.state.post
    if (!post) return null
    return <article className='content' dangerouslySetInnerHTML={{ __html: post.content.bodyHtml }} />
  }
}
