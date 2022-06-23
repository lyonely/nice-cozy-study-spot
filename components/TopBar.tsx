import { Space, Group, Button, Text } from '@mantine/core'
import { MapPin } from 'react-feather'
import Link from 'next/link'
import { useViewportSize } from '@mantine/hooks'
import { AppTheme } from '../style/AppTheme'

export default function TopBar() {
	const { height, width } = useViewportSize()
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
								StudyNest
							</div>
						</Group>
					</Link>
				</Group>
			</div>
		</div>
	)
}
