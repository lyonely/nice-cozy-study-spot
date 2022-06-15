import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { capacity } from '../utils/capacity'

export default function LocationCard({ location }) {
    const { url, name, sub_locations } = location
    const locationMax = sub_locations.reduce(
        (acc: number, { max_capacity }) => acc + parseInt(max_capacity),
        0
    )
    const locationCurr = sub_locations.reduce(
        (acc, { capacity }) => acc + parseInt(capacity),
        0
    )

    return (
        <Card
            shadow="sm"
            radius="lg"
            p="md"
            withBorder
            style={{
                margin: '1.5em 0.5em 1.5em 0.5em',
            }}
        >
            <Card.Section>
                <Link href={name} passHref>
                    <Image
                        height={160}
                        src={url}
                        alt={name}
                        withPlaceholder
                        placeholder={
                            <Image
                                height={160}
                                src="https://www.imperial.ac.uk/media/migration/administration-and-support-services/library-3--tojpeg_1550242474436_x2.jpg"
                            ></Image>
                        }
                    />
                </Link>
            </Card.Section>
            <Link href={name} passHref>
                <Group
                    position="apart"
                    direction="column"
                    spacing="xs"
                    style={{ marginTop: '1em' }}
                >
                    <Text weight={500}>{name}</Text>
                    <Text
                        size="sm"
                        color="gray"
                        style={{ paddingLeft: '0.5em' }}
                    >
                        capacity
                    </Text>
                    <CapacityBar
                        capacity={capacity(locationCurr, locationMax)}
                        isSubLocation={false}
                    />
                </Group>
            </Link>
            <Accordion offsetIcon={false}>
                <Accordion.Item label="Details">
                    <SubStudySpaces
                        location={name}
                        sub_locations={sub_locations}
                    />
                </Accordion.Item>
            </Accordion>
        </Card>
    )
}
