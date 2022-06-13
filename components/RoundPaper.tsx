import { Paper, Text } from '@mantine/core'

export default function RoundPaper({content}) {
    return (
        <Paper shadow="sm" radius="lg" p="md" withBorder>
            <Text>{content}</Text>
        </Paper>
    );
}