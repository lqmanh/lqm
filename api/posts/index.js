const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = {
    readFile: promisify(fsModule.readFile),
  }
}
const path = require('path')
const url = require('url')
const dayjs = require('dayjs')


const contentDir = path.normalize('../../content')

const getOne = async (slug) => {
  try {
    return fs.readFile(path.join(contentDir, `${slug}.json`), { encoding: 'utf8' })
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


module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'max-age=3600')
  let body
  if (query.slug) body = await getOne(query.slug)
  else body = getAll()
  return res.end(body)
}
