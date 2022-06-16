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
// Note: Mantine accordion can only have content of type Accordion.Item
// So functions that actually return AccordionItem will not be listed
interface AccordionLabelProps {
	label: string;
	status: string;
}

function AccordionLabel({ label, status }: AccordionLabelProps) {
	let color;
	switch (status) {
		case "Open 24 Hours":
		case "Open":
			color = "green";
			break;
		case "Closed": color = "red"; break;
		case "Closing Soon": color = "orange"; break;
	}
	return (
		<div>
			<Text>{label}</Text>
			<Text size="sm" color={color} weight={400}>
				{status}
			</Text>
		</div>
	);
}

function OpeningStatus({ location }) {
	const { time_open, time_closed } = location

	// Displays "open", "closes" or "closes soon" (if location closes within an hour)
	let openingTime = parseInt(moment(time_open).format('HH'));
	let closingTime = parseInt(moment(time_closed).format('HH'));

	var current = new Date();
	var currentHour = current.getHours();

	let status;

	if (openingTime == closingTime) {
		status = "Open 24 Hours"
	} else if (currentHour < openingTime && currentHour + 24 >= closingTime) {
		status = "Closed";
	} else if (currentHour > openingTime && closingTime > openingTime && currentHour >= closingTime) {
		status = "Closed";
	} else if (currentHour == closingTime - 1 || closingTime == 0 && currentHour == 23) {
		status = "Closing Soon"
	} else {
		status = "Open"
	}
	return status;
}
