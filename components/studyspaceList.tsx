import { Group, Container } from '@mantine/core'
import LocationCard from './LocationCard'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'

export default function StudySpaceList() {
    const [term, setTerm] = useState('')
    const [data, setData] = useState<any[]>()

    const fetchLocations = async () => {
        const resp = await fetch(`/api/locations?term=${term}`)
        setData(await resp.json())
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        fetchLocations()
        if (term) {
            console.log(term)
        }
    }, [term])
    return (
        <Container>
            <SearchBar setTerm={setTerm} />
            {data
                ? data.map((location) => (
                      <LocationCard
                          name={location.name}
                          imgPath=""
                          sub_locations={location.sub_locations}
                          key={location.name}
                      />
                  ))
                : 'Loading...'}
        </Container>
    )
}
