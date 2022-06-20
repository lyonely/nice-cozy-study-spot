import {
    Button,
    Card,
    Container,
    Group,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core'
import { useRouter } from 'next/router'
import BackButton from '../../../components/BackButton'

export default function Report() {
    const router = useRouter()
    const {
        query: { location, subloc },
    } = router

    return (
        <Container style={{ height: '100vh' }}>
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
                <Group direction="column">
                    <Text weight={600} size="xl">
                        Report Issue for {subloc}
                    </Text>
                    <TextInput
                        label="Title"
                        placeholder="Brief summary of issue"
                        required
                        radius="md"
                        style={{ width: '100%' }}
                    ></TextInput>
                    <Textarea
                        label="Description"
                        placeholder="Details of the issue"
                        minRows={10}
                        maxRows={20}
                        autosize
                        radius="md"
                        style={{ width: '100%' }}
                    ></Textarea>
                    <Button color="yellow" radius="md">
                        Submit
                    </Button>
                </Group>
            </Card>
        </Container>
    )
}
