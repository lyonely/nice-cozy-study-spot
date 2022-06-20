import { Container, Text } from '@mantine/core'
import LocationListCard from './LocationCard'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import SubLocationSearchCard from './SubLocationSearchCard'
import LoadingCircle from './LoadingCircle'
import { useUser } from '@auth0/nextjs-auth0'

export default function StudySpaceList() {
    const [term, setTerm] = useState('')
    const [data, setData] = useState<any[]>()
    const [subLocData, setSubLocData] = useState<any[]>()
    const { user } = useUser()

    const fetchLocations = async () => {
        const resp = await fetch(`/api/locations?term=${term}`)
        setData(await resp.json())
    }

    const fetchSubLocations = async () => {
        if (term) {
            setSubLocData(
                await (await fetch(`/api/sublocations?term=${term}`)).json()
            )
        }
    }

    useEffect(() => {
        console.log(data)
        console.log(subLocData)
    }, [data])

    useEffect(() => {
        fetchLocations()
        if (term) {
            fetchSubLocations()
            console.log(term)
        }
    }, [term])
    return data ? (
        <Container>
            <SearchBar term={term} setTerm={setTerm} />
            {data && data.length !== 0 && (
                <>
                    <Text size="xs" align="center" color="gray">
                        Locations
                    </Text>
                    {data.map((location) => (
                        <LocationListCard
                            location={location}
                            user={user}
                            key={location.name}
                        />
                    ))}
                </>
            )}
            {subLocData && subLocData.length !== 0 && (
                <>
                    <Text size="xs" align="center" color="gray">
                        Sub Locations
                    </Text>
                    {subLocData.map((sl) => (
                        <SubLocationSearchCard
                            sub_location={sl}
                            key={sl.name}
                        />
                    ))}
                </>
            )}
        </Container>
    ) : (
        <LoadingCircle />
    )
}
