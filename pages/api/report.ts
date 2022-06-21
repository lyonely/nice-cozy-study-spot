import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Next.js treats the location here as a dual type of either string or string[]
	// Need to type cast to string
	if (req.method !== 'POST') {
		res.status(400).send("Reports have to be POST requests.")
	}
	console.log(req.body)
	const body = req.body
	res.status(200).json(await prisma.issues.create({
		data: {
			resolved: false,
			subject: body.subject,
			description: body.description,
			sub_locations: {
				connect: {
					index: body.sub_location_index
				}
			}
		}
	}))
}