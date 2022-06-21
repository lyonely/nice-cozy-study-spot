import { Divider, Modal, Text, Button, Space, Group } from "@mantine/core";
import { useState } from "react";
import { MessageReport, ThumbUp } from "tabler-icons-react";

export default function IssueAlert({ issue }) {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={false}
            >
                {issue.description}
                <Divider mt="sm" />
                <Text size="xs" mt={3} mb={3} >
                    If the issue seems to be resolved, please remove it to notify other users.
                </Text>
                <Button
                    color="blue"
                    variant="light"
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
                    {issue.title}
                </Button>
            </Group>
        </>
    );
}
