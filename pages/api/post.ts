import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const content = require(`../../content/${slug}.json`)
  res.status(200).json(content)
}
