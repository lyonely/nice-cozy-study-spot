import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { locationCapacity } from '../utils/capacity'
import OpeningHours from './OpeningHours'

export default function LocationPageCard({ location }) {
	const { url, name, sub_locations } = location

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
			</Card.Section>
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
					capacity={locationCapacity(sub_locations)}
					isSubLocation={false}
				/>
			</Group>
			<Accordion offsetIcon={false}>
				<Accordion.Item label="Opening Hours">

					<OpeningHours location={location} />
				</Accordion.Item>
				<Accordion.Item label="Capacities">
					<SubStudySpaces
						location={name}
						sub_locations={sub_locations}
					/>
				</Accordion.Item>
			</Accordion>
		</Card>
	)
}
