import { Badge } from '@mantine/core'

export default function CapacityTag({ current, total }) {
    return <Badge>{`${current}/${total}`}</Badge>
}
