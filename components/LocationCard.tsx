import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { locationCapacity } from '../utils/capacity'

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
					<Text weight={500}>{name}</Text>
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
			<Accordion offsetIcon={false} shadows="xs">
				<Accordion.Item label="Details" >
					<SubStudySpaces
						location={name}
						sub_locations={sub_locations}
					/>
				</Accordion.Item>
			</Accordion>
		</Card>
	)
}
