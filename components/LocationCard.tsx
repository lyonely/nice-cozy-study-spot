import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { locationCapacity } from '../utils/capacity'
import { Books, BuildingCommunity, BuildingHospital, DeviceLaptop, Flower, Home, School, Trees } from 'tabler-icons-react'

export default function LocationListCard({ location }) {
	const { name, sub_locations } = location

	return (
		<Card
			shadow="md"
			radius="lg"
			p="md"
			withBorder
			style={{
				margin: '0.75em 0.5em 0.75em 0.5em',
				boxShadow: '2px 2px 3px'
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
	switch (true) {
		case (name.includes("Library")): return <Books />;
		case (name.includes("Park")): return <Trees />;
		case (name.includes("School")): return <School />;
		case (name.includes("Lawn")): return <Flower />;
		case (name.includes("Hall")): return <Home />;
		case (name.includes("Hospital")): return <BuildingHospital />;
		case (name.includes("Huxley")): return <DeviceLaptop />;
		default: return <BuildingCommunity />;
	}
}


