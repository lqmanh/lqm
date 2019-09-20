import { NextApiRequest, NextApiResponse } from 'next'

const { children: posts } = require('../../content/.dirstat.json')

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(posts)
}
