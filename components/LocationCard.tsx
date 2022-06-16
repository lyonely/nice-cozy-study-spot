import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { locationCapacity } from '../utils/capacity'
import { Books, BuildingArch, BuildingCommunity, Flower, School, Trees } from 'tabler-icons-react'

export default function LocationListCard({ location }) {
	const { name, sub_locations } = location

	return (
		<Card
			shadow="sm"
			radius="lg"
			p="md"
			withBorder
			style={{
				margin: '0.75em 0.5em 0.75em 0.5em',
			}}
		>
			<Link href={name} passHref>
				<Group
					position="apart"
					direction="column"
					spacing="xs"
				>
					<Group>
						{getIcon(name)}
						<Text weight={500}>{name}</Text>
					</Group>

					<Text
						size="sm"
						color="gray"
						style={{ paddingLeft: '0.5em' }}
					>
						capacity
					</Text>
					<CapacityBar
						capacity={locationCapacity(sub_locations)}
						isSubLocation={false}
					/>
				</Group>
			</Link>
			<Accordion offsetIcon={false}>
				<Accordion.Item label="View Study Spaces" >
					<SubStudySpaces
						location={name}
						sub_locations={sub_locations}
					/>
				</Accordion.Item>
			</Accordion>
		</Card>
	)
}

function getIcon(name) {
	if (name.includes("Library")) {
		return <Books />
	} else if (name.includes("Park")) {
		return <Trees />
	} else if (name.includes("School")) {
		return <School />
	} else if (name.includes("Lawn")) {
		return <Flower />
	} else {
		return <BuildingCommunity />
	}
}