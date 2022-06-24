import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body.ids)
	const search = req.body.ids.map(r => { return { index: parseInt(r) } })
	console.log(search)
	const resp = await prisma.sub_locations.findMany({
		where: {
			OR: search
		},
		include: {
			locations: true
		}
	})
	console.log(resp)
	res.status(200).json(resp)
}