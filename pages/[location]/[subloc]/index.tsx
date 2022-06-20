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
	LockAccess
} from 'tabler-icons-react'
import BackButton from '../../../components/BackButton'
import LoadingCircle from '../../../components/LoadingCircle'
import { useUser } from '@auth0/nextjs-auth0'
import StarButton from '../../../components/StarButton'

export default function SubLocation() {
	const router = useRouter()
	const {
		query: { location, subloc },
	} = router
	const { data, error } = useSWR(`/api/${location}/${subloc}`, fetcher)
	const { user } = useUser()

	useEffect(() => {
		console.log(data)
	}, [data])

	// TEMPORARY for problem reporting
	// const [issues, setIssues] = useState([])
	const issues = [
		{
			title: "Faulty Socket",
			description: "Socket seems to be broken"
		},
		{
			title: "Missing Chair",
			description: "Missing Swivel Chair :("
		}
	]

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

				<Stack spacing={0}>
					{displayAnyIssues(issues)}
					{cardAccessNeeded(data.card_access_needed)}
				</Stack>

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

				<Group mt={20} mb={15} spacing={0}>
					<Text size="sm" mb={0}>
						See any problems (E.g. faulty sockets, missing whiteboards)
						in this space? {reportIssuesAnchor()}
					</Text>
					<Text size="xs" mt={0} >
						*** If the issue seems to be resolved, please remove it to notify other users.
					</Text>
				</Group>
			</Card>
		</Container>
	) : (
		<LoadingCircle />
	)
}

// TODO: link this to the page for reporting issues
function reportIssuesAnchor() {
	return (<Anchor
		mb={10}
		underline
		size="sm"
		href="https://mantine.dev/"
		target="_blank"
		color="red">
		Report any issues here.
	</Anchor>)
}

function displayAnyIssues(issues) {
	if (issues.size != 0) {
		return (
			<Stack mb={20} spacing={7} align="right">
				{issues.map(i =>
					<>{displayIssue(i)} </>)
				}
			</Stack>)
	}
}

function displayIssue(issue) {
	const [opened, setOpened] = useState(false);
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				withCloseButton={false}
			>
				{issue.description}
			</Modal>

			<Group>
				<Button
					fullWidth
					compact
					onClick={() => setOpened(true)}
					color="red"
					radius="md"
					variant="light"
				>
					<Space w={7} />
					<MessageReport size={16} />
					<Space w={13} />
					{issue.title}
				</Button>
			</Group>
		</>
	)

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
