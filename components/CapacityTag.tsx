import { Badge } from '@mantine/core'

export default function CapacityTag({ current, max }) {
    return <Badge>{`${current}/${max}`}</Badge>
}
