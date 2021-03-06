import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const FLICKR_API_KEY = '3aedad13c4053365a085f050c12f07b7'
const FLICKR_USER_ID = '184521961@N05'

const getPhotoUrls = async (albumID: string): Promise<string[]> => {
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const content = require(`../../content/${slug}.json`)

  if (content.type === 'album') {
    content.photoUrls = await getPhotoUrls(content.albumID)
    content.headerImage = content.photoUrls[0]
  }

  res.status(200).json(content)
}
