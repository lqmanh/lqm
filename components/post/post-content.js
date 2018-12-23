import { PureComponent } from 'react'
import axios from 'axios'

import TagList from '../tag-list'


export default class PostContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { content: null }
  }

  async componentDidMount() {
    const res = await axios.get(`/api/posts?slug=${this.props.slug}`)
    this.setState({ content: res.data })
  }

  render() {
    const content = this.state.content
    if (!content) return null
    return (
      <>
        <article className='content' dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
        <TagList tags={content.tags} />
      </>
    )
  }
}
