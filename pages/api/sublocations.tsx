import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const term: string = req.query.term as string

    console.log(req.body)
    const obj = {}
    req.body.filters.forEach((element) => {
        obj[element] = true
    })

    const resp = await prisma.sub_locations.findMany({
        include: {
            locations: true,
        },
        where: {
            name: {
                contains: term,
                mode: 'insensitive',
            },
            ...obj,
        },
    })
    res.status(200).json(resp)
}
