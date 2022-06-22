import {
	Button,
	Card,
	Container,
	Group,
	Select,
	Text,
	Textarea,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import BackButton from '../../../components/BackButton'
import LoadingCircle from '../../../components/LoadingCircle'
import { fetcher } from '../../../utils/fetcher'

const reportOptions = [
	{ value: 'Washroom Issue', label: 'Washroom' },
	{ value: 'Noise Level Issue', label: 'Noise Level' },
	{ value: 'Temperature Issue', label: 'Temperature' },
	{ value: 'Amenity Issue', label: 'Amenity' },
	{ value: 'Other Issue', label: 'Other' },
]

/*
 * Request body:
 * sub_location_index
 * subject
 * description
 */
export default function Report(
) {
	const router = useRouter()
	const {
		query: { location, subloc },
	} = router
	const { data, error } = useSWR(`/api/${location}/${subloc}`, fetcher)

	const form = useForm<{
		subject: string, description: string | undefined
	}>({
		initialValues: {
			subject: "",
			description: "",
		},
		validate: (values) => ({
			subject: !values.subject ? 'Please select an issue' : null
		}),
	})

	const handleSubmit = async (values) => {
		const req = {
			body: JSON.stringify({
				...values,
				sub_location_index: data.index
			}),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const response = await fetch(`/api/report`, req)
		console.log(response)
		router.push(`/${location}/${subloc}`)
	}
	return data ? (
		<Container style={{ height: '100vh' }} >
			<BackButton url={`/${location}/${subloc}`} text={subloc} />

			<Card
				shadow="sm"
				radius="lg"
				p="md"
				withBorder
				style={{
					margin: '0.25em 0.5em 1.5em 0.5em',
				}}
			>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Group direction="column">
						<Text weight={600} size="xl">
							Report Issue for {subloc}
						</Text>
						<Select
							required
							label="What seems to be the problem?"
							placeholder="Click me to select an issue"
							clearable
							style={{ width: '100%' }}
							radius="md"
							data={reportOptions}
							{...form.getInputProps('subject')} />
						<Textarea
							label="Description (Optional)"
							placeholder="Details of the issue"
							minRows={10}
							maxRows={20}
							autosize
							radius="md"
							style={{ width: '100%' }}
							{...form.getInputProps('description')}
						></Textarea>
						<Button type="submit" color="yellow" radius="md">
							Submit
						</Button>
					</Group>
				</form>
			</Card>
		</Container >) : <LoadingCircle />

}
