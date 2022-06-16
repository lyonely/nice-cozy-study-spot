import { Badge } from '@mantine/core'
import { capacity } from '../utils/capacity'

export default function CapacityTag({ current, max }) {
    const badgeColor = (c) => {
        return c < 20
            ? 'green'
            : c < 40
            ? 'lime'
            : c < 60
            ? 'yellow'
            : c < 80
            ? 'orange'
            : 'red'
    }

    return (
        <Badge
            color={badgeColor(capacity(current, max))}
        >{`${current}/${max}`}</Badge>
    )
}
