import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Next.js treats the location here as a dual type of either string or string[]
	// Need to type cast to string
	const body = req.body
	res.status(200).json(await prisma.issues.update({
		where: {
			id: body.id
		},
		data: {
			resolved: true
		}
	}))
}