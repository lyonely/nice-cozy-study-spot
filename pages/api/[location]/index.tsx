import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { location } } = req
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