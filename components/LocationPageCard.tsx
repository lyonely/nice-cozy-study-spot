import { Card, Image, Text, Group, Accordion } from '@mantine/core'
import SubStudySpaces from './substudyspaces'
import Link from 'next/link'
import CapacityBar from './CapacityBar'
import { locationCapacity } from '../utils/capacity'
import OpeningHours from './OpeningHours'
import OpeningHoursAccordionItem from './OpeningHours'
import moment from 'moment'

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

				<Accordion.Item label={<AccordionLabel label={name} status={OpeningStatus({ location })} />}>
					<OpeningHours location={location} />
				</Accordion.Item >

				<Accordion.Item label="Capacities">
					<SubStudySpaces
						location={name}
						sub_locations={sub_locations}
					/>
				</Accordion.Item>
			</Accordion>
		</Card >
	)
}


// Functions for Opening Status of a location (not applicable to sub-locations)

function AccordionLabel({ label, status }) {
	return (
		<div>
			<Text>{label}</Text>
			<Text size="sm" color="dimmed" weight={400}>
				{status}
			</Text>
		</div>
	);
}

function OpeningStatus({ location }) {
	const { time_open, time_closed } = location

	// Displays "open", "closes" or "closes soon" (if location closes within an hour)
	const openingTime = parseInt(moment(time_open).format('HH'));
	const closingTime = parseInt(moment(time_closed).format('HH'));

	var current = new Date();
	var currentHour = current.getHours();

	let status;

	if (openingTime <= currentHour && currentHour < closingTime) {
		status = "Open";
	} else if (currentHour == 11 && closingTime == 12 || currentHour == closingTime - 1) {
		status = "Closing Soon";
	} else {
		status = "Closed";
	}

	return status;
}
