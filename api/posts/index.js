const path = require('path')
const url = require('url')
const dayjs = require('dayjs')


const contentDir = path.join(__dirname, '../../content')

const getContentOne = (slug) => {
  try {
    return JSON.stringify(require(path.join(contentDir, `${slug}.json`)))
  } catch (err) {
    return ''
  }
}

const getAll = () => {
  const posts = require(path.join(contentDir, '.dirstat.json')).children
  posts.sort((a, b) => {
    if (dayjs(b.content.publicationDate).isAfter(dayjs(a.content.publicationDate))) return 1
    return -1
  })
  return JSON.stringify(posts)
}


module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'max-age=3600')
  let body
  if (query.slug) body = getContentOne(query.slug)
  else body = getAll()
  return res.end(body)
}
