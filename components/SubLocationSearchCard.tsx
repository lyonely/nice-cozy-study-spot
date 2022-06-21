import { Card, Text, Group, } from '@mantine/core'
import Link from 'next/link'
import { subCapacity } from '../utils/capacity'
import CapacityBar from './CapacityBar'
export default function SubLocationSearchCard({ sub_location }) {
	console.log(sub_location)
	const { name, locations } = sub_location

	return (
		<Card
			shadow="md"
			radius="lg"
			p="md"
			withBorder
			style={{
				margin: '0.75em 0.5em 0.75em 0.5em',
				boxShadow: '2px 2px 3px',
			}}
		>
			<Link href={`${locations.name}/${name}`} passHref>
				<Group
					position="apart"
					direction="column"
					spacing="xs"
				>
					<Text weight={500}>{name}</Text>
					<Text weight={200}>{locations.name}</Text>
					<Text
						size="sm"
						color="gray"
						style={{ paddingLeft: '0.5em' }}
					>
						capacity
					</Text>
					<CapacityBar
						capacity={subCapacity(sub_location)}
						isSubLocation={false}
					/>
				</Group>
			</Link>
		</Card>
	)
}
