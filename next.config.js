const withSass = require('@zeit/next-sass')
const { children: posts } = require('./content/.dirstat.json')

const configs = {
  exportPathMap: async () => {
    const pathMap = { '/': { page: '/' } }
    for (const post of posts) {
      pathMap[`/posts/${post.path.name}`] = {
        page: '/post',
        query: { slug: post.path.name }
      }
    }
    return pathMap
  }
}

module.exports = withSass(configs)
