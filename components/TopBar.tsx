import { Space, Group, Container } from '@mantine/core'
import { MapPin } from 'react-feather';
import Link from 'next/link'
import { useViewportSize } from '@mantine/hooks';
import { AppTheme } from '../style/AppTheme';


export default function TopBar() {
	const { height, width } = useViewportSize();
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{
				width: 500,
				// Media query with value from theme
				[`@media (maxWidth: ${AppTheme.breakpoints.xs}px)`]: {
					width: width
				},
			}}>
				<Container px="xs" sx={(theme) => ({
					backgroundColor: theme.colors.brown[0],
				})}>
					<Space h="xs" />
					<Link href="/">
						<Group>
							<MapPin />

							<div className="hotbar__title">Study Space Finder</div>
						</Group>
					</Link>
					<Space h="xs" />
				</Container>
			</div>
		</div>
	);
}