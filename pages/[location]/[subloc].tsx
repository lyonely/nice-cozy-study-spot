import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useEffect, useState } from 'react'
import { Accordion, Card, Container, Text, Group } from '@mantine/core'
import CapacityBar from '../../components/CapacityBar'

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

    // TODO: fetch actual values from db
    // const { capacity, max_capacity, name, description } = subloc
    //const capacityPercentage = capacity / max_capacity * 100

    return (
        <div>

            <div>
                <Group
                    position="apart"
                    direction="column"
                    spacing="xs"
                    style={{ marginTop: '1em', marginLeft: "1em" }}
                >
                    <Text weight={500}>{subloc}</Text>
                </Group>
                <Card
                    shadow="sm"
                    radius="lg"
                    p="md"
                    withBorder
                    style={{
                        margin: '1.5em 0.5em 1.5em 0.5em',
                    }}
                >
                    <Group
                        position="apart"
                        direction="column"
                        spacing="xs"
                        style={{ marginTop: '0em' }}
                    >
                        <Text weight={500}> Capacity </Text>
                        <CapacityBar

                            // TODO: replace 30 with actual values from db
                            capacity={30}
                            isSubLocation={false}
                        />
                    </Group>
                    <Group
                        style={{ marginTop: '1em' }}
                    >
                        {data && sublocation ? (
                            <>
                                <Text weight={500}>Daily capacity</Text>
                                <CapacityGraph
                                    datapoints={sublocation.trend_capacity}
                                />

                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Group>
                    <Accordion offsetIcon={false}>

                        <Accordion.Item label="Description">
                            <Text>TEMPORARY DESCRIPTION!! to replace!!! </Text>
                        </Accordion.Item>
                    </Accordion>
                </Card >
            </div>
        </div>
    )
}
