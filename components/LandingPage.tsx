import { Container, Space, Button } from '@mantine/core'
import RoundPaper from '../components/RoundPaper'
import Link from 'next/link'
import { setCookie, getCookie } from 'typescript-cookie'
import { useEffect } from 'react'

export default function LandingPage() {
	const mainContent = () => {
		return (
			<div className="landing">
				<div className="landing__title">Welcome!</div>
				<p className="landing__desc">
					{' '}
					Let us help you find good study spaces.
				</p>
				<div className="landing__button">
					<Link href="/studyspaces">
						<Button
							color="yellow"
							radius="xl"
							size="xl"
							variant="filled"
						>
							<p className="landing__desc">Let's go!</p>
						</Button>
					</Link>
				</div>
			</div>
		)
	}

	useEffect(() => {
		const value = getCookie('favourites')
		if (!value) {
			setCookie('favourites', 'indexes', { expires: 7 })
		}
	})

	return (
		<Container>
			<div>
				<Space h="xl" />
				<Container size="xs">
					<RoundPaper content={mainContent()} />
				</Container>
				<Space h="xl" />
			</div>
		</Container>
	)
}
