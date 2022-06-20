import { Space, Group, Button, Text } from '@mantine/core'
import { MapPin } from 'react-feather'
import Link from 'next/link'
import { useViewportSize } from '@mantine/hooks'
import { AppTheme } from '../style/AppTheme'
import { useUser } from '@auth0/nextjs-auth0'

export default function TopBar() {
    const { height, width } = useViewportSize()
    const { user: user } = useUser()
    console.log(user)
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
                style={{
                    width: 500,
                    // Media query with value from theme
                    [`@media (maxWidth: ${AppTheme.breakpoints.xs}px)`]: {
                        width: width,
                    },
                }}
            >
                <Group
                    px="xs"
                    position="apart"
                    sx={(theme) => ({
                        padding: '0.75em 0 0.75em 0',
                        backgroundColor: theme.colors.brown[0],
                    })}
                >
                    <Link href="/">
                        <Group style={{ marginLeft: '0.75em' }}>
                            <MapPin />

                            <div className="hotbar__title">
                                Study Space Finder
                            </div>
                        </Group>
                    </Link>
                    {user ? (
                        <Link href="/api/auth/logout" passHref>
                            <Button variant="subtle">
                                <Text weight={300}>Log Out</Text>
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/api/auth/login" passHref>
                            <Button variant="subtle">
                                <Text weight={300}>Log In</Text>
                            </Button>
                        </Link>
                    )}
                </Group>
            </div>
        </div>
    )
}
