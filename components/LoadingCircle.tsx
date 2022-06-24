import { Center, Loader } from '@mantine/core'

export default function LoadingCircle() {
    return (
        <Center style={{ height: '80vh' }}>
            <Loader size="xl" color="yellow" />
        </Center>
    )
}
