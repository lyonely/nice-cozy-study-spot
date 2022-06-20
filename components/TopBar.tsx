import { Space, Group, Button, Text } from '@mantine/core'
import { MapPin } from 'react-feather'
import Link from 'next/link'
import { useViewportSize } from '@mantine/hooks'
import { AppTheme } from '../style/AppTheme'
import { useUser } from '@auth0/nextjs-auth0'

export default function TopBar() {
	console.log(process.env.AUTH0_BASE_URL)
	const { height, width } = useViewportSize()
	const { user, error, isLoading } = useUser()
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
						<Group style={{ marginLeft: '0em' }}>
							<MapPin />

							<div className="hotbar__title">
								Study Space Finder
							</div>
						</Group>
					</Link>
					{!isLoading && user ? (
						<a href="/api/auth/logout">
							<Button variant="subtle" compact={true}>
								<Text weight={300}>Log Out</Text>
							</Button>
						</a>
					) : (
						<a href="/api/auth/login">
							<Button variant="subtle" compact={true}>
								<Text weight={300}>Log In</Text>
							</Button>
						</a>
					)}
				</Group>
			</div>
		</div>
	)
}
