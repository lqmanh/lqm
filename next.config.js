const withSass = require('@zeit/next-sass')

const configs = {
  exportPathMap: async () => {
    const posts = require('./content/.dirstat.json').children
    const pathMap = {
      '/': { page: '/' }
    }
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
