import { Divider, Modal, Text, Button, Space, Group } from "@mantine/core";
import { useState } from "react";
import { MessageReport, Separator, ThumbUp } from "tabler-icons-react";

export default function IssueAlert({ issue, mutate }) {
	const [opened, setOpened] = useState(false);

	const handleResolve = async () => {
		const req = {
			body: JSON.stringify({
				id: issue.id
			}),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const response = await fetch(`/api/resolve`, req)
		mutate()
		setOpened(false)
		console.log(response)
	}
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				withCloseButton={false}
			>
				<Text weight={400}>{issue.subject}</Text>
				<Text weight={200} size="sm">{issue.description}</Text>
				<Divider mt="sm" />
				<Text size="xs" mt={3} mb={3} >
					If the issue seems to be resolved, please remove it to notify other users.
				</Text>
				<Button
					color="blue"
					variant="light"
					onClick={handleResolve}
				>
					<ThumbUp />
					<Space w={3} />
					Mark as Resolved
				</Button>
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
					{issue.subject}
				</Button>
			</Group>
		</>
	);
}
