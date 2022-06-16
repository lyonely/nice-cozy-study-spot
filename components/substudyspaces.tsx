import Link from 'next/link'
import { Text, Button, Group } from '@mantine/core'
import CapacityBar from './CapacityBar'
import { subCapacity } from '../utils/capacity'
import CapacityTag from './CapacityTag'

export default function SubStudySpaces({ location, sub_locations }) {
    return sub_locations.map((sub) => {
        return (
            <Link
                href={`/${location}/${sub.name}`}
                key={`${location}-${sub.name}`}
            >
                <Button
                    classNames={{
                        inner: 'sublocation__button',
                        label: 'sublocation__label',
                    }}
                    fullWidth
                    variant="light"
                    color="yellow"
                    style={{
                        height: 'auto',
                        marginBottom: '0.25em',
                        padding: '0.25em',
                        color: 'black',
                    }}
                >
                    <Text style={{ width: '60%' }} weight={500}>
                        {sub.name}
                    </Text>

                    <CapacityTag
                        current={sub.capacity}
                        max={sub.max_capacity}
                    />
                </Button>
            </Link>
        )
    })
}
