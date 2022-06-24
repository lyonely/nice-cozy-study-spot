import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Next.js treats the location here as a dual type of either string or string[]
    // Need to type cast to string
    const sublocation = req.query.sublocation as string
    const location = req.query.location as string
    res.status(200).json(
        await prisma.sub_locations.findFirst({
            where: {
                AND: [
                    {
                        name: sublocation,
                    },
                    {
                        locations: {
                            name: location,
                        },
                    },
                ],
            },
            include: {
                locations: true,

                issues: {
                    where: { resolved: false },
                },
            },
        })
    )
}
