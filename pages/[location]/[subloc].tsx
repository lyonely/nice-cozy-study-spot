import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useEffect, useState } from 'react'
import { Accordion, Card, Text, Divider, Group, List, ThemeIcon, Title } from '@mantine/core'
import CapacityTag from '../../components/CapacityTag'
import { CircleCheck, CircleOff, Container, FileDescription, Pencil } from 'tabler-icons-react';
import BackButton from '../../components/BackButton'

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
        <Container>
            <div>
                <BackButton url={`/${location}`} text={location} />
                <Card
                    shadow="sm"
                    radius="lg"
                    p="md"
                    withBorder
                    style={{
                        margin: '0.25em 0.5em 1.5em 0.5em',
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
                                <Title order={1}>{subloc}</Title>

                                <Group>
                                    <Text weight={500}> Current Capacity: </Text>
                                    <CapacityTag
                                        current={data.capacity}
                                        max={data.max_capacity}
                                    />
                                </Group>
                            </Group>
                            <Group style={{ marginTop: '1em' }}>
                                <Text weight={500}>Daily Capacity Trends</Text>
                                <CapacityGraph
                                    datapoints={data.trend_capacity}
                                />


                            </Group>
                            <Accordion offsetIcon={false}>
                                <Accordion.Item
                                    label="Description"
                                    icon={
                                        <ThemeIcon color="blue" variant="light" radius="xl">
                                            <FileDescription size={20} />
                                        </ThemeIcon>}
                                >
                                    <Text>{data.description}</Text>
                                </Accordion.Item>
                                <Accordion.Item
                                    label="Amenities"
                                    icon={
                                        <ThemeIcon color="yellow" variant="light" radius="xl">
                                            <Pencil size={20} />
                                        </ThemeIcon>}
                                >
                                    {subLocationAmenities(data)}
                                </Accordion.Item>
                            </Accordion>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </div>
        </Container>
    ) : (
        <p>Loading...</p>
    )
}


function subLocationAmenities(sublocation) {

    // Extract amenities into map
    const { toilets_nearby, microwave, monitor, plug_sockets, printer, whiteboard, height_adjustable_desks } = sublocation;

    return (
        <div>
            <Divider my="sm" />
            <List
                spacing="xs"
                size="sm"
                center
            >
                <List.Item icon={listIcon(toilets_nearby)}>Toilets Nearby</List.Item>
                <List.Item icon={listIcon(microwave)}>Microwave Nearby</List.Item>
                <List.Item icon={listIcon(monitor)}>Monitor</List.Item>
                <List.Item icon={listIcon(plug_sockets)}>Plug Sockets</List.Item>
                <List.Item icon={listIcon(printer)}>Printer</List.Item>
                <List.Item icon={listIcon(whiteboard)}>WhiteBoard</List.Item>
                <List.Item icon={listIcon(height_adjustable_desks)}>Height Adjustable Desks</List.Item>

            </List>
        </div>
    )
}

function listIcon(available) {
    if (available) {
        return (
            <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
            </ThemeIcon>
        );
    } else {
        return (<ThemeIcon color="red" size={24} radius="xl">
            <CircleOff size={16} />
        </ThemeIcon>);
    }
}