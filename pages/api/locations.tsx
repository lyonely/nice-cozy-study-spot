import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const term: string = req.query.term as string
	const resp = await prisma.locations.findMany({
		include: {
			sub_locations: true

		},
		where: {
			OR: [
				{
					name: {
						contains: term,
						mode: 'insensitive'
					}
				}, {
					sub_locations: {
						some: {
							name: {
								contains: term,
								mode: 'insensitive'
							}
						}
					}
				}]
		}
	})
	res.status(200).json(resp)
}