const fs = require('fs').promises
const path = require('path')
const { StatWriter } = require('directory-stat')
const { StatCollector } = require('directory-stat/stat-collectors')
const Converter = require('showdown').Converter
const fm = require('front-matter')

const getBodyHtml = (body) => {
  const converter = new Converter({
    omitExtraWLInCodeBlocks: true,
    ghCompatibleHeaderId: true,
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    smartIndentationFix: true,
    disableForced4SpacesIndentedSublists: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    openLinksInNewWindow: true,
    emoji: true
  })
  return converter.makeHtml(body)
}

class BlogPostMetaCollector extends StatCollector {
  constructor() {
    super('meta')
  }

  async collect(pathStr, stat) {
    if (!stat.isFile()) return undefined
    if (path.extname(pathStr).toLowerCase() !== '.md') return undefined

    const { attributes: meta, body } = fm(await fs.readFile(pathStr, { encoding: 'utf8' }))

    // side effect
    let bodyHtml
    if (!meta.type || meta.type === 'article') {
      bodyHtml = getBodyHtml(body)
    }
    const { dir, name } = path.parse(pathStr)
    try {
      fs.writeFile(path.join(dir, `${name}.json`), JSON.stringify({ bodyHtml, ...meta }))
    } catch (err) {
      console.error('Error while converting .md to .json')
    }

    return meta
  }
}

try {
  const sw = new StatWriter(path.join(__dirname, 'content'), {
    depth: 1,
    exclude: ['.dirstat.json', '*.json'],
    minified: true,
    output: '.dirstat.json',
    statCollectors: [new BlogPostMetaCollector()]
  })
  sw.export()
} catch (err) {
  console.error('Failed to build content')
}
