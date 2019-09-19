const fs = require('fs').promises
const path = require('path')
const { StatWriter } = require('directory-stat')
const { StatCollector } = require('directory-stat/stat-collectors')
const Converter = require('showdown').Converter
const fm = require('front-matter')
const axios = require('axios')

const FLICKR_API_KEY = '3aedad13c4053365a085f050c12f07b7'
const FLICKR_USER_ID = '184521961@N05'

const getPhotoUrls = async (albumID) => {
  const {
    data: {
      photoset: { photo }
    }
  } = await axios.get(
    'https://www.flickr.com/services/rest/' +
      '?method=flickr.photosets.getPhotos' +
      '&format=json' +
      '&nojsoncallback=1' +
      '&extras=url_o' +
      `&api_key=${FLICKR_API_KEY}` +
      `&user_id=${FLICKR_USER_ID}` +
      `&photoset_id=${albumID}`
  )
  return photo.map((p) => p.url_o)
}

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
    let bodyHtml, photoUrls
    if (meta.type === 'album') {
      photoUrls = await getPhotoUrls(meta.albumID)
      meta.headerImage = photoUrls[0]
    } else {
      bodyHtml = getBodyHtml(body)
    }
    const { dir, name } = path.parse(pathStr)
    try {
      fs.writeFile(path.join(dir, `${name}.json`), JSON.stringify({ bodyHtml, photoUrls, ...meta }))
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
