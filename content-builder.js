const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = {
    readFile: promisify(fsModule.readFile),
    writeFile: promisify(fsModule.writeFile),
  }
}
const path = require('path')
const directoryStat = require('directory-stat')
const marked = require('marked')
const fm = require('front-matter')


const StatCollector = directoryStat.StatCollectors.StatCollector
const StatWriter = directoryStat.StatWriter

class BlogPostCollector extends StatCollector {
  constructor() {
    super('content')
  }

  async collect(pathStr, stat) {
    if (!stat.isFile()) return undefined
    if (path.extname(pathStr).toLowerCase() !== '.md') return undefined

    const content = await fs.readFile(pathStr, { encoding: 'utf8' })
    const result = fm(content)

    // side effect: convert .md to .json
    const bodyHtml = marked(result.body, {
      gfm: true,
      breaks: true,
      smartLists: true,
      smartypants: true,
      xhtml: true,
    })
    const { dir, name } = path.parse(pathStr)
    try {
      fs.writeFile(
        path.join(dir, `${name}.json`),
        JSON.stringify({ bodyHtml, ...result.attributes }),
      )
    } catch (err) {
      console.error('Error while converting .md to .json')
    }

    return result.attributes
  }
}

try {
  const sw = new StatWriter(path.join(__dirname, 'content'), {
    depth: 1,
    exclude: ['.dirstat.json', '*.json'],
    output: '.dirstat.json',
    statCollectors: [new BlogPostCollector()]
  })
  sw.export()
} catch (err) {
  console.error('Failed to build content!')
}
