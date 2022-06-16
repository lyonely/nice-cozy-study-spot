import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useEffect, useState } from 'react'
import { Accordion, Card, Container, Text, Group } from '@mantine/core'
import CapacityBar from '../../components/CapacityBar'
import CapacityTag from '../../components/CapacityTag'

export default function SubLocation() {
    const router = useRouter()
    const {
        query: { location, subloc },
    } = router
    const { data, error } = useSWR(`/api/${location}/${subloc}`, fetcher)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>
            <div>
                <Card
                    shadow="sm"
                    radius="lg"
                    p="md"
                    withBorder
                    style={{
                        margin: '1.5em 0.5em 1.5em 0.5em',
                    }}
                >
                    {data ? (
                        <>
                            <Group
                                position="apart"
                                direction="column"
                                spacing="xs"
                                style={{ marginTop: '0em' }}
                            >
                                <Text weight={500}>{subloc}</Text>
                                <Group>
                                    <Text weight={500}> Capacity </Text>
                                    <CapacityTag
                                        current={data.capacity}
                                        max={data.max_capacity}
                                    />
                                </Group>
                            </Group>
                            <Group style={{ marginTop: '1em' }}>
                                <Text weight={500}>Daily capacity</Text>
                                <CapacityGraph
                                    datapoints={data.trend_capacity}
                                />
                            </Group>
                            <Accordion offsetIcon={false}>
                                <Accordion.Item label="Description">
                                    <Text>{data.description}</Text>
                                </Accordion.Item>
                            </Accordion>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </div>
        </div>
    )
}
