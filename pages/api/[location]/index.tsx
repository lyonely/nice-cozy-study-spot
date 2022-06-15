import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Next.js treats the location here as a dual type of either string or string[]
	// Need to type cast to string
	const location = req.query.location as string
	const data = await prisma.locations.findFirst({
		where: {
			name: location
		},
		include: {
			sub_locations: true
		}
	})
	setTimeout(() => res.status(200).json(data), 400)
}