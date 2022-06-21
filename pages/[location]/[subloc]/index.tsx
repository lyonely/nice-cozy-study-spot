import { useRouter } from 'next/router'
import CapacityGraph from '../../../components/CapacityGraph'
import useSWR from 'swr'
import { fetcher } from '../../../utils/fetcher'
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
	Space,
	Anchor,
	Stack,
	Modal,
	Button,
	Divider,
} from '@mantine/core'
import CapacityTag from '../../../components/CapacityTag'
import {
	AlertCircle,
	Armchair,
	CircleCheck,
	CircleOff,
	FileDescription,
	Map2,
	Pencil,
	MessageReport,
	LockAccess,
	ThumbUp
} from 'tabler-icons-react'
import BackButton from '../../../components/BackButton'
import LoadingCircle from '../../../components/LoadingCircle'
import { useUser } from '@auth0/nextjs-auth0'
import StarButton from '../../../components/StarButton'
import IssueAlert from '../../../components/IssueAlert'
import Link from 'next/link'

export default function SubLocation() {
	const router = useRouter()
	const {
		query: { location, subloc },
	} = router
	const { data, error, mutate } = useSWR(`/api/${location}/${subloc}`, fetcher)
	const { user } = useUser()

	useEffect(() => {
		console.log(data)
	}, [data])

	return data ? (
		<Container>
			<Group position='apart'>
				<BackButton url={`/${location}`} text={location} />
				<Link href={`/${location}/${subloc}/report`}>
					<Button style={{ marginRight: "1em" }} variant='outline' compact radius='sm' color='red'>
						<Text weight={350}>Report an issue</Text>
					</Button>
				</Link>
			</Group>
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
						height={140}
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
					<Group position="apart" style={{ width: '100%' }}>
						<Text weight={600} size="xl">
							{subloc}
						</Text>
						<StarButton disabled={user == null} saved={false} />
					</Group>

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
					<Space />
				</Group>

				<SubLocationIssues issues={data.issues} mutate={mutate} />

				<Accordion offsetIcon={false}>
					<Accordion.Item
						label="Description"
						icon={
							<ThemeIcon color="blue" variant="light" radius="xl">
								<FileDescription size={20} />
							</ThemeIcon>
						}
					>

						{cardAccessNeeded(data.card_access_needed)}
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
					<Accordion.Item
						label="Directions"
						icon={
							<ThemeIcon
								color="green"
								variant="light"
								radius="xl"
							>
								<Map2 size={20} />
							</ThemeIcon>
						}
					>
						<Text>
							Here are specific directions to help locate this
							area... ᕙ( •̀ ᗜ •́ )ᕗ
						</Text>
					</Accordion.Item>
				</Accordion>
			</Card>
		</Container>
	) : (
		<LoadingCircle />
	)
}

function SubLocationIssues({ issues, mutate }) {
	return (<div style={{ marginTop: "0.75em" }}>
		<Text size="sm" color="gray">Issues</Text>
		{
			issues.length === 0 ?
				<Text weight={300}>This area has no reported issues!</Text> :
				(<Stack mb={20} spacing={7} align="right">
					{issues.map((issue) => <IssueAlert mutate={mutate} issue={issue} />)
					}
				</Stack>)
		}</div>)
}

function cardAccessNeeded(cardAccess) {
	if (cardAccess) {
		return (
			<Group grow>
				<Alert
					mb="md"
					icon={<LockAccess size={16} />}
					title="Card Access Required "
					color="beige"
					radius="md"
				>
					A staff or departmental card is needed to access this space.
				</Alert>

			</Group>


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
