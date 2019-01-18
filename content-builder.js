const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = {
    readFile: promisify(fsModule.readFile),
    writeFile: promisify(fsModule.writeFile)
  }
}
const path = require('path')
const { StatWriter } = require('directory-stat')
const { StatCollector } = require('directory-stat/stat-collectors')
const Converter = require('showdown').Converter
const fm = require('front-matter')

class BlogPostMetaCollector extends StatCollector {
  constructor() {
    super('meta')
  }

  async collect(pathStr, stat) {
    if (!stat.isFile()) return undefined
    if (path.extname(pathStr).toLowerCase() !== '.md') return undefined

    const { attributes: meta, body } = fm(
      await fs.readFile(pathStr, { encoding: 'utf8' })
    )

    // side effect: convert .md to .json
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
    const bodyHtml = converter.makeHtml(body)
    const { dir, name } = path.parse(pathStr)
    try {
      fs.writeFile(
        path.join(dir, `${name}.json`),
        JSON.stringify({ bodyHtml, ...meta })
      )
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
