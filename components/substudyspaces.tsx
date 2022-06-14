import Link from 'next/link'
import { Badge, Group, Text, Button, Container, Center } from '@mantine/core'
import CapacityBar from './CapacityBar'

export default function SubStudySpaces({ location, subareas }) {
    return subareas.map((subarea) => {
        const min = Math.ceil(0)
        const max = Math.floor(100)
        const capacity = Math.floor(Math.random() * (max - min) + min)

        return (
            <div className="sublocation-button">
                <Link href={`/${location}/${subarea.name}`}>
                    <Text align="left" style={{ width: '100%' }} weight={500}>
                        {subarea.name}
                    </Text>
                </Link>
                <CapacityBar capacity={capacity} />
            </div>
        )
    })
}
