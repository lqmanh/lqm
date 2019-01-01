const path = require('path')
const url = require('url')


const contentDir = path.join(__dirname, '../../content')

const getContentOne = async (slug) => {
  try {
    const fsModule = require('fs')
    let fs = fsModule.promises
    if (!fs) {
      const { promisify } = require('util')
      fs = { readFile: promisify(fsModule.readFile) }
    }
    return fs.readFile(path.join(contentDir, `${slug}.json`), { encoding: 'utf8' })
  } catch (err) {
    return ''
  }
}

const getAll = () => {
  const dayjs = require('dayjs')
  const posts = require(path.join(contentDir, '.dirstat.json')).children
  posts.sort((a, b) => {
    if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
    return -1
  })
  return JSON.stringify(posts)
}


module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'max-age=3600')
  let body
  if (query.slug) body = await getContentOne(query.slug)
  else body = getAll()
  return res.end(body)
}
