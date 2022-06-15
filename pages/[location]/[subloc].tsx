import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import moment from 'moment'
import { useEffect, useState } from 'react'

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
                    <CapacityGraph datapoints={sublocation.trend_capacity} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
