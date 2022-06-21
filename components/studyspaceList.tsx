import { Container, Group, MultiSelect, Select, Text } from '@mantine/core'
import LocationListCard from './LocationCard'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import SubLocationSearchCard from './SubLocationSearchCard'
import LoadingCircle from './LoadingCircle'
import { useUser } from '@auth0/nextjs-auth0'

const allSortOrders = () => {
    return [
        { value: 'a-z', label: 'A-Z' },
        { value: 'z-a', label: 'Z-A' },
        { value: 'capacity-incr', label: 'Capacity (low-high)' },
        { value: 'capacity-decr', label: 'Capacity (high-low)' },
    ]
}

const allFilters = () => {
    return [
        { value: 'card_access_needed', label: 'Card access' },
        { value: 'microwave', label: 'Microwave' },
        { value: 'printer', label: 'Printer' },
        { value: 'monitor', label: 'Monitor' },
        { value: 'plug_sockets', label: 'Charging sockets' },
        { value: 'whiteboard', label: 'Whiteboard' },
        { value: 'toilets_nearby', label: 'Toilets nearby' },
        { value: 'quiet_study_available', label: 'Quiet study' },
        { value: 'group_study_available', label: 'Group study' },
        { value: 'silent_study_available', label: 'Silent study' },
        { value: 'breakout_space_available', label: 'Breakout spaces' },
        { value: 'height_adjustable_desks', label: 'Height adjustable desks' },
    ]
}

export default function StudySpaceList() {
    const [term, setTerm] = useState('')
    const [data, setData] = useState<any[]>()
    const [subLocData, setSubLocData] = useState<any[]>()
    const { user } = useUser()
    const [sortOrder, setSortOrder] = useState('')
    const [filters, setFilters] = useState<any[]>()

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
            <Group
                direction="row"
                position="apart"
                spacing="xs"
                style={{ margin: '0 0.5em 0.5em 0.5em' }}
            >
                <Select
                    placeholder="Sort by:"
                    value={sortOrder}
                    onChange={setSortOrder}
                    data={allSortOrders()}
                    style={{ maxWidth: '40%' }}
                />
                <MultiSelect
                    placeholder="Filter by:"
                    data={allFilters().sort((x, y) => {
                        return x.label.localeCompare(y.label)
                    })}
                    clearable
                    style={{ maxWidth: '60%' }}
                />
            </Group>
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
