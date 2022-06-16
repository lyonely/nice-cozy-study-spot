import { useRouter } from 'next/router'
import CapacityGraph from '../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { useEffect, useState } from 'react'
import {
    Accordion,
    Card,
    Text,
    Group,
    List,
    ThemeIcon,
    Alert,
    Container,
    Image,
    Title,
} from '@mantine/core'
import CapacityTag from '../../components/CapacityTag'
import {
    AlertCircle,
    Armchair,
    CircleCheck,
    CircleOff,
    FileDescription,
    Pencil,
} from 'tabler-icons-react'
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

    return data ? (
        <Container>
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
                <Card.Section>
                    <Image
                        height={160}
                        src={data.locations.picture}
                        alt={data.locations.name}
                    ></Image>
                </Card.Section>
                <Group
                    position="apart"
                    direction="column"
                    spacing="xs"
                    style={{ marginTop: '1em' }}
                >
                    <Text weight={600} size="xl">
                        {subloc}
                    </Text>

                    <Group>
                        <Text size="sm" color="gray">
                            {' '}
                            Capacity{' '}
                        </Text>
                        <CapacityTag
                            current={data.capacity}
                            max={data.max_capacity}
                        />
                    </Group>
                </Group>
                <Group style={{ marginTop: '1em' }}>
                    <Text size="sm" color="gray">
                        Daily Capacity Trends
                    </Text>
                    <CapacityGraph datapoints={data.trend_capacity} />

                    {cardAccessNeeded(data.card_access_needed)}
                </Group>
                <Accordion offsetIcon={false}>
                    <Accordion.Item
                        label="Description"
                        icon={
                            <ThemeIcon color="blue" variant="light" radius="xl">
                                <FileDescription size={20} />
                            </ThemeIcon>
                        }
                    >
                        <Text>{data.description}</Text>
                    </Accordion.Item>
                    <Accordion.Item
                        label="Amenities"
                        icon={
                            <ThemeIcon
                                color="yellow"
                                variant="light"
                                radius="xl"
                            >
                                <Pencil size={20} />
                            </ThemeIcon>
                        }
                    >
                        {subLocAmenities(data)}
                    </Accordion.Item>
                    <Accordion.Item
                        label="Types of Study Spaces"
                        icon={
                            <ThemeIcon
                                color="beige"
                                variant="light"
                                radius="xl"
                            >
                                <Armchair size={20} />
                            </ThemeIcon>
                        }
                    >
                        {subLocStudySpaces(data)}
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Container>
    ) : (
        <p>Loading...</p>
    )
}

function cardAccessNeeded(cardAccess) {
    if (cardAccess) {
        return (
            <Alert
                mt="md"
                mb="md"
                icon={<AlertCircle size={16} />}
                title="Card Access Required"
                color="red"
            >
                A staff or departmental card is needed to access this space.
            </Alert>
        )
    }
}

function subLocAmenities(sublocation) {
    // Extract amenities into map
    const {
        toilets_nearby,
        microwave,
        monitor,
        plug_sockets,
        printer,
        whiteboard,
        height_adjustable_desks,
    } = sublocation

    return (
        <div>
            <List spacing="xs" size="sm" center>
                <List.Item icon={listIcon(toilets_nearby)}>
                    Toilets Nearby
                </List.Item>
                <List.Item icon={listIcon(microwave)}>
                    Microwave Nearby
                </List.Item>
                <List.Item icon={listIcon(monitor)}>Monitor</List.Item>
                <List.Item icon={listIcon(plug_sockets)}>
                    Plug Sockets
                </List.Item>
                <List.Item icon={listIcon(printer)}>Printer</List.Item>
                <List.Item icon={listIcon(whiteboard)}>WhiteBoard</List.Item>
                <List.Item icon={listIcon(height_adjustable_desks)}>
                    Height Adjustable Desks
                </List.Item>
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
        )
    } else {
        return (
            <ThemeIcon color="red" size={24} radius="xl">
                <CircleOff size={16} />
            </ThemeIcon>
        )
    }
}

function subLocStudySpaces(sublocation) {
    const {
        group_study_available,
        silent_study_available,
        breakout_space_available,
        quiet_study_available,
    } = sublocation

    const spaceMap = new Map()

    return (
        <div>
            <List spacing="xs" size="sm" center>
                <List.Item icon={listIcon(breakout_space_available)}>
                    Breakout Space Available
                </List.Item>
                <List.Item icon={listIcon(silent_study_available)}>
                    Silent Study Available
                </List.Item>
                <List.Item icon={listIcon(quiet_study_available)}>
                    Quiet Study Available
                </List.Item>
                <List.Item icon={listIcon(group_study_available)}>
                    Group Study Available
                </List.Item>
            </List>
        </div>
    )
}
