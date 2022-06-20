import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import LocationPageCard from '../../components/LocationPageCard'
import { Container } from '@mantine/core'
import BackButton from '../../components/BackButton'
import LoadingCircle from '../../components/LoadingCircle'
import { useUser } from '@auth0/nextjs-auth0'

export default function Location() {
    const router = useRouter()
    const {
        query: { location },
    } = router
    const { data, error } = useSWR(`/api/${location}`, fetcher)
    const { user } = useUser()

    return (
        <Container>
            <BackButton url="/studyspaces" text="Location List" />
            {data ? (
                <LocationPageCard location={data} user={user} />
            ) : (
                <LoadingCircle />
            )}
        </Container>
    )
}
