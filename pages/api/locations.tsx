import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const term: string = req.query.term as string
    const resp = await prisma.locations.findMany({
        // orderBy: { name: "asc" },
        include: {
            sub_locations: true,
        },
        where: {
            name: {
                contains: term,
                mode: 'insensitive',
            },
        },
    })

    res.status(200).json(resp)
}
