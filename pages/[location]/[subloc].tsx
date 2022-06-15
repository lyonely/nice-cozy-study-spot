import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useEffect, useState } from 'react'
import { Container } from '@mantine/core'

export default function SubLocation() {
    const router = useRouter()
    const {
        query: { location, subloc },
    } = router
    const { data, error } = useSWR(`/api/${location}`, fetcher)

    const [sublocation, setSublocation] = useState<any>()

    useEffect(() => {
        if (data) {
            const sl = data.sub_locations.filter((sub) => {
                return sub.name === subloc
            })
            setSublocation(sl[0])
        }
    }, [data])

    return (
        <div>
            {data && sublocation ? (
                <>
                    <p>{subloc}</p>
                    <Container>
                        <p>Daily capacity</p>
                        <CapacityGraph
                            datapoints={sublocation.trend_capacity}
                        />
                    </Container>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
