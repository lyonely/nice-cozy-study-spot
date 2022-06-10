import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const data = await prisma.sub_locations.findMany()
	setTimeout(() => res.status(200).json(data), 400)
}