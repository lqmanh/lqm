import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const FLICKR_API_KEY = '3aedad13c4053365a085f050c12f07b7'
const FLICKR_USER_ID = '184521961@N05'

const getPrimaryPhotoUrl = async (albumID) => {
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
  for (const p of photo) {
    if (p.isprimary === '1') return p.url_o
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { children: posts } = require('../../content/.dirstat.json')

  for (const post of posts) {
    const { meta } = post
    if (meta.type === 'album') {
      meta.headerImage = await getPrimaryPhotoUrl(meta.albumID)
    }
  }

  res.status(200).json(posts)
}