import { Tooltip } from '@mantine/core'
import { useState } from 'react'
import { Star } from 'tabler-icons-react'

export default function StarButton({ disabled, saved }) {
    const [opened, setOpened] = useState(false)

    return disabled ? (
        <>
            <Tooltip label="Log in to star!" opened={opened} placement="end">
                <Star
                    strokeWidth={2}
                    size={20}
                    onClick={() => setOpened(!opened)}
                />
            </Tooltip>
        </>
    ) : (
        <Star
            strokeWidth={2}
            size={20}
            className={saved ? 'star__filled' : 'star'}
            onClick={() => console.log('clicked')}
        />
    )
}
