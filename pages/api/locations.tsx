import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const term: string = req.query.term as string

	res.status(200).json(
		await prisma.locations.findMany({
			include: {
				sub_locations: true
			},
			where: {
				name: {
					contains: term,
					mode: 'insensitive'
				}
			}
		}))
}