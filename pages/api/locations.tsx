import type { NextApiRequest, NextApiResponse } from 'next'
import mockData from "./mockData.json"

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(mockData.locations)
	setTimeout(() => res.status(200).json(mockData.locations), 4000)
}